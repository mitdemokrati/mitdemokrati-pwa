/* istanbul ignore file */

export const setupAxios = async (): Promise<void> => {
  const [axios, axiosRetry] = await Promise.all([
    import('axios'),
    import('axios-retry'),
  ]);

  // Disabling comments needed because Typescripts flips when importing axiosRetry async
  // eslint-disable-next-line
  // @ts-ignore
  axiosRetry.default(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });
};
