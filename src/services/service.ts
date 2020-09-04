import axios from 'axios';

export const tryFetch = async <T>(url: string) => {
  if (!navigator.onLine) {
    console.warn('Cannot make API calls in offline mode.');
    return undefined;
  }

  return axios.request<T>({ url });
};
