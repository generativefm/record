import React from 'react';
import PropTypes from 'prop-types';
import './progress-bar.styles.scss';

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    {progress > 0 ? (
      <div
        className="progress-bar__fill"
        style={{ width: `${progress * 100}%` }}
      ></div>
    ) : null}
  </div>
);

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
