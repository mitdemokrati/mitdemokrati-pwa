import React from 'react';

import { clear } from '../../storage/storageAdapter';

import './button.less';

export const ResetButton = () => {
  const resetAndReload = () => {
    clear();
    window.location.reload(false);
  };

  return (
    <button
      alt="reset"
      className="btn btn-reset"
      type="button"
      onClick={resetAndReload}
    >
      {'\u21BB'}
    </button>
  );
};
