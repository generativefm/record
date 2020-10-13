import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import createProvider from '@generative-music/web-provider';
import createLibrary from '@generative-music/web-library';

const provider = createProvider();
const audio = document.createElement('audio');
const sampleFormat = audio.canPlayType('audio/ogg') !== '' ? 'ogg' : 'mp3';
const samplesByFormat = getSamplesByFormat();
const sampleIndex = samplesByFormat[sampleFormat];

export default createLibrary({
  sampleIndex,
  provider,
});
