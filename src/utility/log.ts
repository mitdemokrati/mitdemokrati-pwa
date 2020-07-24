export const logError = (error: Error | string) => {
  // eslint-disable-next-line no-console
  console.error(`MitDemokrati: ${error}`);
};

export const log = (message: string | [] | object | number) => {
  // eslint-disable-next-line no-console
  console.log(`MitDemokrati: ${message}`);
};
