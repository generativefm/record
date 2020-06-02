import targetReducer from './target.reducer';
import userClickedPlay from './actions/user-clicked-play.creator';

describe('playback target reducer', () => {
  describe('when a USER_CLICKED_PLAY action is dispatched', () => {
    it('should return the state if the payload is undefined', () => {
      const state = {
        id: 'mock-id',
        type: 'mock-type',
      };
      const result = targetReducer(state, userClickedPlay());
      expect(result).to.equal(state);
    });
    it('should update the state with the specified payload', () => {
      const id = 'mock-id';
      const type = 'mock-type';
      const result = targetReducer({}, userClickedPlay({ id, type }));
      expect(result).to.deep.equal({ id, type });
    });
  });
});
