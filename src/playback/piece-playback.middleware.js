import Tone from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';
import selectIsPlaying from './is-playing.selector';
import selectTarget from './target.selector';
import PIECE from './piece.type';

const piecePlaybackMiddleware = (store) => (next) => {
  const { wav } = getSamplesByFormat('http://localhost:6969/');
  const provider = makeProvider(wav);

  return (action) => {
    const previousState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const previousTarget = selectTarget(previousState);
    const target = selectTarget(nextState);
    const wasPlaying = selectIsPlaying(previousState);
    const isPlaying = selectIsPlaying(nextState);
    if (previousTarget !== target || wasPlaying !== isPlaying) {
      if (previousTarget.type === PIECE && wasPlaying) {
        // stop
      } else if (target.type === PIECE && isPlaying) {
        // start
        const piece = byId[target.id];
        Promise.all([
          piece.loadMakePiece(),
          provider.provide(piece.sampleNames, Tone.context),
        ])
          .then(([makePiece, samples]) =>
            makePiece({
              audioContext: Tone.context,
              destination: Tone.Master,
              samples,
            })
          )
          .then((cleanUp) => {
            console.log('starting...');
            Tone.Transport.start();
          });
      }
    }
    return result;
  };
};

export default piecePlaybackMiddleware;
