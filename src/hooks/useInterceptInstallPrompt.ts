import { useEffect } from 'react';

export const useInterceptInstallPrompt = (
  callback: (event: BeforeInstallPromptEvent) => void
): void => {
  const interceptInstallPrompt = (e: Event) => {
    const installEvent = e as BeforeInstallPromptEvent;
    installEvent.preventDefault();
    callback(installEvent);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', interceptInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', interceptInstallPrompt);
    };
  }, []);
};
