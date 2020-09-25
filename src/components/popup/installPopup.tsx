import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { InstallButton } from '../button/installButton';
import { selectInstallPrompt } from '../../ducks/shared/sharedSelectors';
import { isMobile, isStandalone } from '../../utility/environment';

import './popup.less';

const THIRTY_SECONDS = 1000 * 20;

export const InstallPopup = (): JSX.Element | null => {
  const [display, setDisplay] = useState(false);
  const installPrompt = useSelector(selectInstallPrompt);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (shouldDisplayInstallPopup(installPrompt)) {
        setDisplay(true);
      }
    }, THIRTY_SECONDS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return display ? (
    <div className="popup popup--install">
      <button
        className="popup--button__close"
        type="button"
        onClick={() => setDisplay(false)}
      >
        {'\u2715'}
      </button>

      <p>Hold dig opdateret med nye afstemninger.</p>
      <p>Installer MitDemokratis app.</p>

      <InstallButton />
    </div>
  ) : null;
};

function shouldDisplayInstallPopup(installPrompt?: BeforeInstallPromptEvent) {
  return installPrompt && isMobile() && !isStandalone();
}
