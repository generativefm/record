import ALERT_CREATED from './actions/alert-created.type';
import USER_CLICKED_ALERT from './actions/user-clicked-alert.type';

const alertsMiddleware = () => (next) => {
  const clickHandlers = new Map();
  return (action) => {
    switch (action.type) {
      case ALERT_CREATED: {
        const { id, url, onClick } = action.payload;
        if (id && !url && onClick) {
          clickHandlers.set(id, onClick);
        }
        break;
      }
      case USER_CLICKED_ALERT: {
        const id = action.payload;
        const clickHandler = clickHandlers.get(id);
        if (clickHandler) {
          setTimeout(() => {
            clickHandler();
          });
        }
        break;
      }
      default: {
        // do nothing
      }
    }
    return next(action);
  };
};

export default alertsMiddleware;
