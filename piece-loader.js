'use strict';

const pieceLoader = (source) => {
  const pieceManifest = JSON.parse(source);
  if (!pieceManifest.isRecordable) {
    return `export default {
      isRecordable: false
    }`;
  }
  const output = `import image from '${pieceManifest.image}';
  export default {
    image,
    loadMakePiece: () => import('${
      pieceManifest.makePiece
    }').then((m) => m.default),
    isRecordable: true,
    title: '${pieceManifest.title}',
    id: '${pieceManifest.id}',
    artist: '${pieceManifest.artistId}',
    tags: [${pieceManifest.tags.map((tag) => `"${tag}"`)}],
    releaseDate: new Date('${pieceManifest.releaseDate}'),
    sampleNames: [${pieceManifest.sampleNames.map((name) => `"${name}"`)}]
  }`;

  return output;
};

module.exports = pieceLoader;
