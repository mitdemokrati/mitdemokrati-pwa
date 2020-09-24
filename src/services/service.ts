import axios, { AxiosResponse } from 'axios';

import { logWarn } from '../utility/log';
import { isOnline } from '../utility/online';

export const tryFetch = async <T>(
  url: string
): Promise<AxiosResponse<T> | undefined> => {
  if (!isOnline()) {
    logWarn('Cannot make API calls in offline mode.');
    return undefined;
  }

  return axios.request<T>({ url });
};
