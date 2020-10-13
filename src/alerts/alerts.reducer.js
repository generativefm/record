import ALERT_CREATED from './actions/alert-created.type';
import USER_CLICKED_ALERT from './actions/user-clicked-alert.type';
import USER_VIEWED_ALERTS from './actions/user-viewed-alerts.type';
import RECORDING_PROGRESS_UPDATED from '../recordings/actions/recording-progress-updated.type';
import RECORDING_FINISHED from './recording-finished.type';

const alertsReducer = (
  state = {
    feedback: {
      id: 'feedback',
      description: 'Problems? Questions? Requests? Bored?',
      timestamp: Date.now(),
      isExternal: true,
      isLoud: true,
      isUnread: true,
      isPersisted: true,
      callToAction: 'Send me an email',
      url: 'mailto:alex@alexbainter.com',
    },
  },
  action
) => {
  switch (action.type) {
    case ALERT_CREATED: {
      const {
        id,
        description,
        callToAction,
        url,
        isExternal,
        isLoud,
        timestamp,
        isPersisted,
      } = action.payload;
      return {
        ...state,
        [id]: {
          id,
          description,
          callToAction,
          url,
          isExternal,
          isLoud,
          timestamp,
          isPersisted,
          isUnread: true,
        },
      };
    }
    case USER_CLICKED_ALERT: {
      const id = action.payload;
      return Object.keys(state).reduce((newState, alertId) => {
        if (alertId === id) {
          return newState;
        }
        newState[alertId] = { ...state[alertId] };
        return newState;
      }, {});
    }
    case USER_VIEWED_ALERTS: {
      const viewedIds = action.payload;
      if (viewedIds.size === 0) {
        return state;
      }
      return Object.keys(state).reduce((newState, id) => {
        newState[id] = {
          ...state[id],
          isUnread: state[id].isUnread && !viewedIds.has(id),
        };
        return newState;
      }, {});
    }
    case RECORDING_PROGRESS_UPDATED: {
      const { recordingId, progress, title } = action.payload;
      if (progress < 1) {
        return state;
      }
      const alertId = `${recordingId}-finished`;
      const existingAlert = Object.values(state).find(
        ({ type }) => type === RECORDING_FINISHED
      );
      if (!existingAlert) {
        return {
          ...state,
          [alertId]: {
            id: alertId,
            description: `"${title}" recording finished.`,
            callToAction: 'Go to recordings',
            url: '/recordings',
            isLoud: false,
            isUnread: true,
            isPersisted: false,
            isExternal: false,
            type: RECORDING_FINISHED,
            typeCount: 1,
          },
        };
      }
      const { id, typeCount } = existingAlert;
      return {
        ...Object.values(state).reduce((stateObj, alert) => {
          if (alert.id !== id) {
            stateObj[alert.id] = {
              ...alert,
            };
          }
          return stateObj;
        }, {}),
        [alertId]: {
          id: alertId,
          description: `"${title}" and ${typeCount} other recording${
            typeCount > 1 ? 's' : ''
          } finished.`,
          callToAction: 'Go to recordings',
          url: '/recordings',
          isLoud: false,
          isUnread: true,
          isPersisted: false,
          isExternal: false,
          type: RECORDING_FINISHED,
          typeCount: typeCount + 1,
        },
      };
    }
    default: {
      if (state['early-access']) {
        return Object.keys(state)
          .filter((key) => key !== 'early-access')
          .reduce((o, key) => {
            o[key] = state[key];
            return o;
          }, {});
      }
      return state;
    }
  }
};

export default alertsReducer;
