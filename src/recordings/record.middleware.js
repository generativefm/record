import Tone from 'tone';
import record from '@generative-music/web-recorder';
import { byId } from '@generative-music/pieces-alex-bainter';
import { reduce, tap, mergeMap, take } from 'rxjs/operators';
import USER_REQUESTED_NEW_RECORDING from './actions/user-requested-new-recording.type';
import PIECE_FINISHED_SCHEDULING from '../playback/actions/piece-finished-scheduling.type';
import recordingProgressUpdated from './actions/recording-progress-updated.creator';
import saveRecording from '../storage/save-recording';
import selectRecordings from './recordings.selector';
import selectIsScheduling from '../playback/is-scheduling.selector';
import selectIsRecording from './is-recording.selector';
import provider from '../samples/provider';

const TIMESLICE_MS = 100;

const handleBeforeUnload = (event) => {
  event.preventDefault();
  event.returnValue = '';
};

const recordMiddleware = (store) => (next) => {
  const getRecordingQueue = (state = store.getState()) => {
    const recordings = selectRecordings(state);
    return Object.values(recordings)
      .filter((recording) => recording.progress === 0)
      .sort((a, b) => a.queuedAt - b.queuedAt);
  };

  const startRecording = (recordingConfig) => {
    const { recordingId, length, fadeIn, fadeOut, pieceId } = recordingConfig;
    const lengthS = length * 60;
    const piece = byId[pieceId];
    piece.loadMakePiece().then((makePiece) =>
      provider.provide(piece.sampleNames, Tone.context).then((samples) => {
        const startTime = Tone.context.now();
        record(
          makePiece,
          { samples },
          {
            lengthS,
            fadeInS: fadeIn,
            fadeOutS: fadeOut,
            timeslice: TIMESLICE_MS,
          }
        )
          .pipe(
            tap(() => {
              const now = Tone.context.now();
              const progress = Math.min((now - startTime) / lengthS, 0.999);
              store.dispatch(
                recordingProgressUpdated({ recordingId, progress })
              );
            }),
            reduce((blobs, newBlob) => blobs.concat([newBlob]), []),
            mergeMap((blobs) =>
              new Blob(blobs, { type: 'audio/ogg; codecs=opus' }).arrayBuffer()
            ),
            take(1),
            mergeMap((arrayBuffer) =>
              saveRecording(recordingConfig, arrayBuffer)
            )
          )
          .subscribe(() => {
            const recordingQueue = getRecordingQueue().filter(
              (recording) => recording.recordingId !== recordingId
            );
            if (recordingQueue.length > 0) {
              startRecording(recordingQueue[0]);
            } else {
              window.removeEventListener('beforeunload', handleBeforeUnload);
            }
            store.dispatch(
              recordingProgressUpdated({
                recordingId,
                progress: 1,
                title: `${piece.title} (Excerpt)`,
              })
            );
          });
      })
    );
  };

  return (action) => {
    const state = store.getState();
    const isRecording = selectIsRecording(state);
    const isScheduling = selectIsScheduling(state);
    if (
      action.type === USER_REQUESTED_NEW_RECORDING &&
      !isRecording &&
      !isScheduling
    ) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      startRecording(action.payload);
    } else if (action.type === PIECE_FINISHED_SCHEDULING) {
      const recordingQueue = getRecordingQueue(state);
      if (recordingQueue.length > 0) {
        window.addEventListener('beforeunload', handleBeforeUnload);
        startRecording(recordingQueue[0]);
      }
    }
    return next(action);
  };
};

export default recordMiddleware;
