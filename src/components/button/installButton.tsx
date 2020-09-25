import React from 'react';

import { isStandalone } from '../../utility/environment';

type InstallButtonProps = {
  installPrompt?: BeforeInstallPromptEvent;
};
export const InstallButton = ({
  installPrompt,
}: InstallButtonProps): JSX.Element | null => {
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
    <button type="button" onClick={promptToInstall}>
      Installer
    </button>
  ) : null;
};
