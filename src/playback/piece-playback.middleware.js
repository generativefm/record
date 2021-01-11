import * as Tone from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import { Subject, combineLatest, from } from 'rxjs';
import {
  map,
  mergeMap,
  filter,
  tap,
  distinctUntilChanged,
  switchMap,
  pairwise,
  withLatestFrom,
  startWith,
} from 'rxjs/operators';
import selectIsPlaying from './is-playing.selector';
import selectTarget from './target.selector';
import PIECE from './piece.type';
import noop from '../utilities/noop';
import USER_CLICKED_PLAY from './actions/user-clicked-play.type';
import sampleLibraryPromise from '../samples/library';

const piecePlaybackMiddleware = (store) => (next) => {
  const action$ = new Subject();
  const state$ = new Subject();
  const target$ = state$.pipe(map(selectTarget));
  const isPlaying$ = state$.pipe(map(selectIsPlaying));
  const destinationNode$ = action$.pipe(
    filter(({ type }) => type === USER_CLICKED_PLAY),
    map(({ payload }) => payload.destinationNode),
    distinctUntilChanged()
  );

  const isPiecePlaying$ = isPlaying$.pipe(
    distinctUntilChanged(),
    withLatestFrom(
      target$.pipe(map(({ type, id }) => type === PIECE && Boolean(byId[id])))
    ),
    map((conditions) => conditions.every((val) => val))
  );

  const activate$ = target$.pipe(
    distinctUntilChanged(
      (previousTarget, currentTarget) =>
        currentTarget.type !== PIECE || previousTarget.id === currentTarget.id
    ),
    filter(({ type, id }) => type === PIECE && Boolean(byId[id])),
    switchMap(({ id }) =>
      byId[id].loadActivate().then((activate) => ({ activate, pieceId: id }))
    ),
    withLatestFrom(target$),
    filter(([{ pieceId }, { id, type }]) => type === PIECE && pieceId === id),
    map(([activateResult]) => activateResult)
  );

  const schedule$ = combineLatest(
    activate$,
    destinationNode$,
    from(sampleLibraryPromise)
  ).pipe(
    mergeMap(([{ activate, pieceId }, destination, sampleLibrary]) =>
      activate({
        context: Tone.context,
        destination,
        sampleLibrary,
      }).then(([deactivate, schedule]) => ({ pieceId, deactivate, schedule }))
    ),
    withLatestFrom(target$),
    filter(([{ pieceId, deactivate }, { id, type }]) => {
      if (type !== PIECE || pieceId !== id) {
        deactivate();
        return false;
      }
      return true;
    }),
    map(([{ deactivate, schedule }]) => [deactivate, schedule]),
    startWith([noop]),
    pairwise(),
    tap(([[deactivatePrevious]]) => {
      deactivatePrevious();
    }),
    map(([, current]) => current),
    map(([, schedule]) => schedule)
  );

  let clearTransport = noop;

  combineLatest(isPiecePlaying$, schedule$).subscribe(
    ([isPlaying, schedule]) => {
      clearTransport();
      if (!isPlaying) {
        return;
      }
      clearTransport();
      const end = schedule();
      clearTransport = () => {
        end();
        Tone.Transport.stop();
        Tone.Transport.cancel();
        clearTransport = noop;
      };
      Tone.Transport.start();
    }
  );

  state$.next(store.getState());

  return (action) => {
    const result = next(action);
    action$.next(action);
    state$.next(store.getState());
    return result;
  };
};

export default piecePlaybackMiddleware;
