import userClickedVolumeToggle from './actions/user-clicked-volume-toggle.creator';
import userFinishedAdjustingVolume from './actions/user-finished-adjusting-volume.creator';
import volumeReducer from './volume.reducer';

describe('volume reducer', () => {
  it('should swap the values when a USER_CLICKED_VOLUME_TOGGLE action is dispatched', () => {
    const originalCurrentValue = 1;
    const originalToggleableValue = 0;
    const state = {
      currentValue: originalCurrentValue,
      toggleableValue: originalToggleableValue,
    };
    const result = volumeReducer(state, userClickedVolumeToggle());
    expect(result).to.deep.equal({
      currentValue: originalToggleableValue,
      toggleableValue: originalCurrentValue,
    });
  });

  describe('when a USER_FINISHED_ADJUSTING_VOLUME action is dispatched', () => {
    it('should return state if the payload equals the currentValue', () => {
      const payload = 0.5;
      const state = {
        currentValue: payload,
        toggleableValue: 0,
      };
      const result = volumeReducer(state, userFinishedAdjustingVolume(payload));
      expect(result).to.equal(state);
    });
    it('should swap the values if the payload is 0', () => {
      const originalCurrentValue = 1;
      const originalToggleableValue = 0;
      const state = {
        currentValue: originalCurrentValue,
        toggleableValue: originalToggleableValue,
      };
      const result = volumeReducer(state, userFinishedAdjustingVolume(0));
      expect(result).to.deep.equal({
        currentValue: originalToggleableValue,
        toggleableValue: originalCurrentValue,
      });
    });
    it('should update currentValue if the payload is not 0', () => {
      const payload = 0.5;
      const state = {
        currentValue: 1,
        toggleableValue: 0,
      };
      const result = volumeReducer(state, userFinishedAdjustingVolume(payload));
      expect(result).to.deep.equal({ ...state, currentValue: payload });
    });
  });
});
