import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons';
import { IconButton } from '@generative.fm/web-ui';
import selectSearchTerm from './search-term.selector';
import userChangedSearchTerm from './actions/user-changed-search-term.creator';
import './search.styles.scss';

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [value, setValue] = useState(searchTerm);
  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
      dispatch(userChangedSearchTerm(event.target.value));
    },
    [setValue, dispatch]
  );

  const handleClearClick = useCallback(() => {
    setValue('');
    dispatch(userChangedSearchTerm(''));
  }, [setValue, dispatch]);

  return (
    <div className="search">
      <div className="search__icon">
        <SearchIcon style={{ width: 30, height: 30 }} />
      </div>
      <input
        type="text"
        className="search__input"
        placeholder="Search by name"
        value={value}
        onChange={handleChange}
      />
      {typeof value === 'string' && value.trim() && (
        <IconButton onClick={handleClearClick}>
          <ClearIcon style={{ width: 30, height: 30 }} />
        </IconButton>
      )}
    </div>
  );
};

export default Search;
