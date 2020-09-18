import axios from 'axios';
import { isOnline } from '../utility/online';

export const tryFetch = async <T>(url: string) => {
  if (!isOnline()) {
    console.warn('Cannot make API calls in offline mode.');
    return undefined;
  }

  return axios.request<T>({ url });
};
