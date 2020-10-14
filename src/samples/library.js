import createProvider from '@generative-music/web-provider';
import createLibrary from '@generative-music/web-library';

const lazyOggSamples = () =>
  import('@generative-music/samples-alex-bainter/src/ogg');
const lazyMp3Samples = () =>
  import('@generative-music/samples-alex-bainter/src/mp3');

const provider = createProvider();
const audio = document.createElement('audio');
const lazySamples =
  audio.canPlayType('audio/ogg') !== '' ? lazyOggSamples() : lazyMp3Samples();

export default lazySamples.then(({ default: getSamples }) => {
  const sampleIndex = getSamples({});
  return createLibrary({
    sampleIndex,
    provider,
  });
});
