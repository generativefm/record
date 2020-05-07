import Tone from 'tone';
import getSamplesByFormat from '@generative-music/samples-alex-bainter';
import makeProvider from '@generative-music/web-provider';
import record from '@generative-music/web-recorder';
import { byId } from '@generative-music/pieces-alex-bainter';
import { reduce, tap, mergeMap, take } from 'rxjs/operators';
import USER_REQUESTED_NEW_RECORDING from './actions/user-requested-new-recording.type';
import recordingProgressUpdated from './actions/recording-progress-updated.creator';
import saveRecording from '../storage/save-recording';
import selectRecordings from './recordings.selector';

const TIMESLICE_MS = 500;

const recordMiddleware = (store) => (next) => {
  const { wav } = getSamplesByFormat('http://localhost:6969/');
  const provider = makeProvider(wav);

  let isRecording;

  const startRecording = (recordingConfig) => {
    isRecording = true;
    const { recordingId, length, fadeIn, fadeOut, pieceId } = recordingConfig;
    const lengthS = length * 60;
    const piece = byId[pieceId];
    piece.load().then((makePiece) =>
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
            const recordings = selectRecordings(store.getState());
            const recordingQueue = Object.values(recordings)
              .filter(
                (recording) =>
                  recording.progress === 0 &&
                  recording.recordingId !== recordingId
              )
              .sort((a, b) => a.queuedAt - b.queuedAt);
            if (recordingQueue.length > 0) {
              startRecording(recordingQueue[0]);
            } else {
              isRecording = false;
            }
            store.dispatch(
              recordingProgressUpdated({ recordingId, progress: 1 })
            );
          });
      })
    );
  };

  return (action) => {
    if (action.type === USER_REQUESTED_NEW_RECORDING && !isRecording) {
      startRecording(action.payload);
    }
    return next(action);
  };
};

export default recordMiddleware;
