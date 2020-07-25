/* eslint-disable no-console */

export const logError = (error: Error | string) => {
  if ((error as Error).name) {
    console.error(error);
  }

  if (typeof error === 'string') {
    console.error(`MitDemokrati: ${error}`);
  }
};

export const log = (message: string | [] | object | number) => {
  console.log(`MitDemokrati: ${message}`);
};
