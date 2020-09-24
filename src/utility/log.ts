/* eslint-disable no-console */

export const logError = (error: Error | string): void => {
  if ((error as Error).name) {
    console.error(error);
  }

  if (typeof error === 'string') {
    console.error(`MitDemokrati: ${error}`);
  }
};

export const logWarn = (warning: string): void => {
  console.warn(`MitDemokrati: ${warning}`);
};

export const log = (
  message: string | [] | Record<string, unknown> | number
): void => {
  console.log(`MitDemokrati: ${message}`);
};
