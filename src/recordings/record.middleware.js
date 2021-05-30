import * as Tone from 'tone';
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
import sampleLibraryPromise from '../samples/library';
import noop from '../utilities/noop';

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
    Promise.all([piece.loadActivate(), sampleLibraryPromise]).then(
      ([activate, sampleLibrary]) => {
        const startTime = Tone.context.now();
        store.dispatch(
          recordingProgressUpdated({
            recordingId,
            progress: 0,
          })
        );
        record(
          activate,
          { sampleLibrary, onProgress: noop },
          {
            lengthS,
            fadeInS: fadeIn,
            fadeOutS: fadeOut,
            timeslice: TIMESLICE_MS,
            mimeType: 'audio/wav',
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
            mergeMap((blobs) => {
              const blob = new Blob(blobs, { type: 'audio/wav' });
              if (typeof blob.arrayBuffer === 'function') {
                return blob.arrayBuffer();
              }
              return new Response(blob).arrayBuffer();
            }),
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
      }
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
