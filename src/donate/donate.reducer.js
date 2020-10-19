import USER_SELECTED_PROMPT_SETTING from './actions/user-selected-prompt-setting.type';

const donationReducer = (state = { isPromptAllowed: true }, action) => {
  if (action.type === USER_SELECTED_PROMPT_SETTING) {
    return Object.assign({}, state, { isPromptAllowed: action.payload });
  }
  return state;
};

export default donationReducer;
