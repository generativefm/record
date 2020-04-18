import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/button.component';
import PlusIcon from '../common/plus-icon.component';
import './piece.styles.scss';

const Piece = ({ imageSrc, title }) => (
  <div className="piece">
    <img src={imageSrc} className="piece__image" />
    <div className="piece__title">{title}</div>
    <Button className="button--change-background" tooltip="New recording">
      <PlusIcon />
    </Button>
  </div>
);

Piece.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.instanceOf(Date),
};

export default Piece;
