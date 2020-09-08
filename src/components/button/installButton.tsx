import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const InstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setInstallPrompt(installEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

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

  return (
    <button type="button" onClick={promptToInstall}>
      Installer
    </button>
  );
};
