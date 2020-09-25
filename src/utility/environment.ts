/* istanbul ignore file */

export const isOnline = (): boolean => navigator?.onLine;

export const isMobile = (): boolean =>
  window?.matchMedia('(max-width: 1024px)')?.matches;

export const isStandalone = (): boolean =>
  window?.matchMedia('(display-mode: standalone)')?.matches;
