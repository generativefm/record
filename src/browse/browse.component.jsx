import React, { useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import pieces from '@generative-music/pieces-alex-bainter';
import Fuse from 'fuse.js';
import selectSearchTerm from '../search/search-term.selector';
import Piece from './piece.component';
import pluck from '../utilities/pluck';
import useIsRecording from '../recordings/use-is-recording.hook';
import './browse.styles.scss';

const recordablePieces = pieces.filter(pluck('isRecordable'));

const getMessage = (searchTerm, searchResults) => {
  if (searchResults.length === 0) {
    return `No pieces found for "${searchTerm}"`;
  }
  return `Showing ${searchResults.length} piece${
    searchResults.length > 1 ? 's' : ''
  } matching "${searchTerm}"`;
};

const Browse = () => {
  const isRecording = useIsRecording();
  const fuse = useRef(new Fuse(recordablePieces, { keys: ['id', 'title'] }));
  const searchTerm = useSelector(selectSearchTerm);
  const searchResults = useMemo(
    () =>
      searchTerm
        ? fuse.current.search(searchTerm).map(pluck('item'))
        : recordablePieces,
    [fuse, searchTerm]
  );

  const message = getMessage(searchTerm, searchResults);

  return (
    <div className="browse">
      {searchTerm && <div className="browse__message">{message}</div>}
      {searchResults.map(({ id }) => (
        <Piece key={id} id={id} isPlayable={!isRecording}></Piece>
      ))}
    </div>
  );
};

export default Browse;
