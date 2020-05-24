import USER_CHANGED_SEARCH_TERM from './actions/user-change-search-term.type';

const searchTermReducer = (state = '', action) => {
  switch (action.type) {
    case USER_CHANGED_SEARCH_TERM: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default searchTermReducer;
