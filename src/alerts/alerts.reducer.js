import ALERT_CREATED from './actions/alert-created.type';
import USER_CLICKED_ALERT from './actions/user-clicked-alert.type';
import USER_VIEWED_ALERTS from './actions/user-viewed-alerts.type';

const alertsReducer = (
  state = {
    feedback: {
      id: 'feedback',
      description: 'Problems? Questions? Requests? Bored?',
      timestamp: Date.now(),
      isExternal: true,
      isLoud: true,
      isUnread: true,
      callToAction: 'Send an email to the creator',
      url: 'mailto:alex@alexbainter.com',
    },
    'early-access': {
      id: 'early-access',
      description:
        'This is an early access version of the app. That means planned features are missing, and stuff can break.',
      timestamp: Date.now(),
      isExternal: true,
      isLoud: true,
      isUnread: true,
      callToAction: 'Use the old version',
      url: 'https://generative.fm/record',
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
    default: {
      return state;
    }
  }
};

export default alertsReducer;
