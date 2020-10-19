import React from 'react';

const makeWrapper = ({ className: wrapperClassName }) => ({
  children,
  className,
}) => (
  <div
    className={[wrapperClassName, className].reduce(
      (str, classNameProp) => `${str}${classNameProp ? ' classNameProp' : ''}`
    )}
  >
    {children}
  </div>
);

export default makeWrapper;
