import React, { useState } from 'react';
import pieces from '@generative-music/pieces-alex-bainter';
import Piece from './piece.component';

const Browse = () => {
  const [filteredPieces] = useState(
    pieces.filter(({ isRecordable }) => isRecordable)
  );
  return (
    <div>
      {filteredPieces.map(({ id, title, image, releaseDate }) => (
        <Piece
          key={id}
          imageSrc={image}
          title={title}
          releaseDate={releaseDate}
        ></Piece>
      ))}
    </div>
  );
};

export default Browse;
