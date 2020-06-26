import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';

const audio = document.createElement('audio');
const sampleFormat = audio.canPlayType('audio/ogg') !== '' ? 'ogg' : 'mp3';

const samplesByFormat = getSamplesByFormat();

export default makeProvider(samplesByFormat[sampleFormat]);
