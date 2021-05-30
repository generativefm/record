import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pieces, { byId } from '@generative-music/pieces-alex-bainter';
import { useLocation } from 'react-router-dom';
import selectSearchTerm from '../search/search-term.selector';
import Piece from './piece.component';
import pluck from '../utilities/pluck';
import selectIsRecording from '../recordings/is-recording.selector';
import userOpenedNewRecordingConfig from '../recordings/actions/user-opened-new-recording-config.creator';

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

const NEW_RECORDING_QS_REGEX = /new-recording=([\w\d-]+)/i;

const Browse = () => {
  const isRecording = useSelector(selectIsRecording);
  const searchTerm = useSelector(selectSearchTerm);
  const searchResults = useMemo(() => {
    if (typeof searchTerm !== 'string') {
      return recordablePieces;
    }
    const upperCaseSearchTerm = searchTerm.trim().toUpperCase();
    if (!upperCaseSearchTerm) {
      return recordablePieces;
    }
    return recordablePieces.filter(({ title }) =>
      title.toUpperCase().includes(upperCaseSearchTerm)
    );
  }, [searchTerm]);

  const { search: queryString } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryStringNewRecordingMatch = queryString.match(
      NEW_RECORDING_QS_REGEX
    );
    if (
      queryStringNewRecordingMatch === null ||
      queryStringNewRecordingMatch.length < 1
    ) {
      return;
    }
    const newRecordingPieceId = queryStringNewRecordingMatch[1].toLowerCase();
    if (!byId[newRecordingPieceId] || !byId[newRecordingPieceId].isRecordable) {
      return;
    }
    dispatch(userOpenedNewRecordingConfig(newRecordingPieceId));
  }, [queryString, dispatch]);

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
