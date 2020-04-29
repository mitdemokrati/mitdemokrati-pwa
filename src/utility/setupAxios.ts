import axios from 'axios';
import axiosRetry from 'axios-retry';

export const setupAxios = () => {
  axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
};
