import React, { useState, useCallback } from 'react';
import SearchIcon from './search-icon.component';
import ClearIcon from './clear-icon.component';
import Button from '../../common/button.component';
import './search.styles.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const handleClearClick = useCallback(() => {
    setValue('');
  }, [setValue]);

  return (
    <div className="search">
      <Button
        className="button--stroke"
        onClick={() => {
          /* noop */
        }}
      >
        <SearchIcon />
      </Button>
      <input
        type="text"
        className="search__input"
        placeholder="Search titles"
        value={value}
        onChange={handleChange}
      />
      <Button
        className={`button--stroke ${value ? 'is-shown' : 'is-hidden'}`}
        onClick={handleClearClick}
      >
        <ClearIcon />
      </Button>
    </div>
  );
};

export default Search;
