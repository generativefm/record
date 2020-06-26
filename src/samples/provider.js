import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';
import pipe from '../utilities/pipe';

const audio = document.createElement('audio');

const sampleFormat = audio.canPlayType('audio/ogg') !== '' ? 'ogg' : 'mp3';

export default pipe(getSamplesByFormat, makeProvider)(sampleFormat);
