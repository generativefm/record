import USER_CLICKED_VOLUME_TOGGLE from './actions/user-clicked-volume-toggle.type';
import USER_ADJUSTED_VOLUME from './actions/user-adjusted-volume.type';

const DEFAULT_STATE = {
  currentValue: 0.75,
  toggleableValue: 0,
};

const swapValues = ({
  currentValue: toggleableValue,
  toggleableValue: currentValue,
}) => ({
  currentValue,
  toggleableValue,
});

const volumeReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USER_CLICKED_VOLUME_TOGGLE: {
      return swapValues(state);
    }
    case USER_ADJUSTED_VOLUME: {
      const newValue = action.payload;
      const { currentValue } = state;
      if (newValue === currentValue) {
        return state;
      }
      if (newValue === 0) {
        return swapValues(state);
      }
      return {
        currentValue: newValue,
        toggleableValue: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default volumeReducer;
