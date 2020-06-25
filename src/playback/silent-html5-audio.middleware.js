import selectIsPlaying from './is-playing.selector';
import silentAudioFile from './silence.mp3';

// Plays a silent audio file from an HTML5 audio element when music is playing.
// This is required to get both iOS devices and the media session API to behave.
const silentHtml5AudioMiddleware = ({ getState }) => (next) => {
  const audio = document.createElement('audio');
  audio.src = silentAudioFile;
  audio.loop = true;
  return (action) => {
    const wasPlaying = selectIsPlaying(getState());
    const result = next(action);
    const isPlaying = selectIsPlaying(getState());
    if (wasPlaying !== isPlaying) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    return result;
  };
};

export default silentHtml5AudioMiddleware;
