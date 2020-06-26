'use strict';

const path = require('path');
const fs = require('fs').promises;
const S3 = require('aws-sdk/clients/s3');
const CloudFront = require('aws-sdk/clients/cloudfront');
const glob = require('glob');
const { gzip } = require('node-gzip');
const { lookup } = require('mime-types');
const envs = require('./secrets');

const { bucketName, cloudfrontDistributionId } =
  process.argv.length >= 3 && process.argv[2] === '-p'
    ? envs.production
    : envs.staging;

const DIST_DIR = 'dist';
const S3_API_VERSION = '2006-03-01';
const CLOUDFRONT_API_VERSION = '2018-11-05';
const NON_DIST_FILENAMES = [];
const INVALIDATED_CACHE_FILES = ['/index.html', '/'];

const globPromise = (pattern, opts) =>
  new Promise((resolve, reject) => {
    glob(pattern, opts, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

const s3 = new S3({
  apiVersion: S3_API_VERSION,
  params: { Bucket: bucketName },
});

const cloudfront = new CloudFront({
  apiVersion: CLOUDFRONT_API_VERSION,
  params: { DistributionId: cloudfrontDistributionId },
});

const listRootObjs = () => s3.listObjectsV2().promise();

const deleteObjs = (objs) =>
  Array.isArray(objs) && objs.length > 1
    ? s3
        .deleteObjects({
          Delete: {
            Objects: objs,
          },
        })
        .promise()
    : Promise.resolve();

const getContentType = (filename = '') => {
  const contentType = lookup(filename);
  if (contentType) {
    return contentType;
  }
  return '';
};

const uploadDistItems = () =>
  Promise.all([`${DIST_DIR}/!(*.map)`].map((pattern) => globPromise(pattern)))
    .then((fileGroups) =>
      fileGroups.reduce((allFiles, fileGroup) => allFiles.concat(fileGroup), [])
    )
    .then((filenames) => {
      if (filenames.length === 0) {
        throw new Error(`No files found in "${DIST_DIR}!"`);
      }
      const allFilenames = filenames.concat(NON_DIST_FILENAMES);
      let completed = 0;
      return Promise.all(
        allFilenames.map((filename) =>
          fs
            .readFile(path.resolve(filename))
            .then((file) => gzip(file))
            .then((buffer) => {
              const uploadParams = {
                Key: filename.includes(DIST_DIR)
                  ? path.basename(filename)
                  : filename,
                Body: buffer,
                ACL: 'public-read',
                ContentType: getContentType(filename),
                ContentEncoding: 'gzip',
              };
              if (!filename.endsWith('.html')) {
                uploadParams.CacheControl = 'max-age=31536000';
              }
              return s3
                .upload(uploadParams)
                .promise()
                .then(() => {
                  completed += 1;
                  console.log(
                    `${filename} upload complete (${completed}/${allFilenames.length})`
                  );
                });
            })
        )
      );
    });

const invalidateCFCache = () =>
  cloudfront
    .createInvalidation({
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: INVALIDATED_CACHE_FILES.length,
          Items: INVALIDATED_CACHE_FILES,
        },
      },
    })
    .promise();

listRootObjs()
  .then(({ Contents }) => {
    console.log(`Removing files from ${bucketName}`);
    return deleteObjs(Contents.map(({ Key }) => ({ Key })));
  })
  .then(() => {
    console.log('Uploading files...');
    return uploadDistItems();
  })
  .then(() => {
    if (!cloudfrontDistributionId) {
      return Promise.resolve();
    }
    console.log('Invalidating CloudFront edge cache...');
    return invalidateCFCache();
  })
  .then(() => {
    console.log('Deployment complete');
  })
  .catch((err) => console.log(err));
