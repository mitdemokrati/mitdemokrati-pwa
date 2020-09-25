import React from 'react';

// import { clear } from '../../storage/storageAdapter';

import './button.less';

export const ResetButton = (): JSX.Element => {
  const resetAndReload = () => {
    // clear();
    window.location.reload();
  };

  return (
    <button
      alt="reset"
      className="btn btn--reset"
      type="button"
      onClick={resetAndReload}
    >
      {'\u21BB'}
    </button>
  );
};
