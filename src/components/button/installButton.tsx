import React from 'react';
import { useSelector } from 'react-redux';

import { selectInstallPrompt } from '../../ducks/shared/sharedSelectors';
import { isStandalone } from '../../utility/environment';

import './button.less';

export const InstallButton = (): JSX.Element | null => {
  const installPrompt = useSelector(selectInstallPrompt);

  const promptToInstall = () => {
    if (installPrompt) {
      return installPrompt.prompt();
    }

    return Promise.reject(
      Error(
        'MitDemokrati: Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  const alreadyInstalled = isStandalone() ?? true;

  return !alreadyInstalled && installPrompt ? (
    <button
      className="btn btn--install"
      type="button"
      onClick={promptToInstall}
    >
      Installer
    </button>
  ) : null;
};
