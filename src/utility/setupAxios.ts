export const setupAxios = async () => {
  const [axios, axiosRetry] = await Promise.all([
    import('axios'),
    import('axios-retry'),
  ]);

  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
};
