import createProvider from '@generative-music/web-provider';
import createLibrary from '@generative-music/web-library';

const makeLazyRetryable = (importFn) => {
  const lazyRetry = (numAttempts = 0) =>
    new Promise((resolve, reject) => {
      importFn()
        .then(resolve)
        .catch((error) => {
          if (numAttempts >= 3) {
            reject(error);
          }
          setTimeout(() => {
            lazyRetry(numAttempts + 1);
          }, 1000);
        });
    });
  return lazyRetry;
};

const lazyOggSamples = makeLazyRetryable(() =>
  import('@generative-music/samples-alex-bainter/src/ogg')
);
const lazyMp3Samples = makeLazyRetryable(() =>
  import('@generative-music/samples-alex-bainter/src/mp3')
);

const provider = createProvider();
const audio = document.createElement('audio');
const lazySamples =
  audio.canPlayType('audio/ogg') !== '' ? lazyOggSamples() : lazyMp3Samples();

export default lazySamples.then(({ default: getSamples }) => {
  const sampleIndex = getSamples();
  return createLibrary({
    sampleIndex,
    provider,
  });
});
