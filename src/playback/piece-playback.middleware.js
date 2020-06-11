import Tone from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';
import { Subject } from 'rxjs';
import { map, mergeMap, filter, exhaustMap, tap } from 'rxjs/operators';
import selectIsPlaying from './is-playing.selector';
import selectTarget from './target.selector';
import PIECE from './piece.type';
import noop from '../utilities/noop';
import pieceStartedScheduling from './actions/piece-started-scheduling.creator';
import pieceFinishedScheduling from './actions/piece-finished-scheduling.creator';

const piecePlaybackMiddleware = (store) => (next) => {
  const { wav } = getSamplesByFormat('http://localhost:6969/');
  const provider = makeProvider(wav);

  let clearTransportAndCleanUp = noop;
  const pieceJobs$ = new Subject();

  const isPiecePlaying = (pieceId) => {
    const state = store.getState();
    const target = selectTarget(state);
    const isPlaying = selectIsPlaying(state);
    return target.type === PIECE && target.id === pieceId && isPlaying;
  };

  pieceJobs$
    .pipe(
      map(([pieceId, destination]) => [byId[pieceId], destination]),
      mergeMap(([piece, destination]) =>
        Promise.all([
          piece.loadMakePiece(),
          provider.provide(piece.sampleNames, Tone.context),
        ]).then(([makePiece, samples]) => [
          piece,
          destination,
          makePiece,
          samples,
        ])
      ),
      filter(([piece]) => isPiecePlaying(piece.id)),
      tap(() => {
        store.dispatch(pieceStartedScheduling());
      }),
      exhaustMap(([piece, destination, makePiece, samples]) =>
        makePiece({
          destination,
          samples,
          audioContext: Tone.context,
        }).then((cleanUp) => [piece, cleanUp])
      )
    )
    .subscribe(([piece, cleanUp]) => {
      store.dispatch(pieceFinishedScheduling());
      clearTransportAndCleanUp = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        cleanUp();
        clearTransportAndCleanUp = noop;
      };
      if (isPiecePlaying(piece.id)) {
        Tone.Transport.start();
      } else {
        clearTransportAndCleanUp();
      }
    });

  return (action) => {
    const previousState = store.getState();
    const result = next(action);
    const nextState = store.getState();
    const previousTarget = selectTarget(previousState);
    const target = selectTarget(nextState);
    const wasPlaying = selectIsPlaying(previousState);
    const isPlaying = selectIsPlaying(nextState);
    if (previousTarget !== target || wasPlaying !== isPlaying) {
      clearTransportAndCleanUp();
      if (target.type === PIECE && isPlaying) {
        pieceJobs$.next([target.id, action.payload.destinationNode]);
      }
    }
    return result;
  };
};

export default piecePlaybackMiddleware;
