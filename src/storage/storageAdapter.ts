import { STORAGE_KEY } from '../config';

const storage =
  typeof window !== 'undefined'
    ? window.localStorage
    : {
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };

const getKey = (key: string): string => `${STORAGE_KEY}/${key}`;

export function getFromStorage(key: string) {
  return storage.getItem(getKey(key));
}

export function setInStorage(key: string, value: string) {
  storage.setItem(getKey(key), value);
}

export function remove(key: string) {
  storage.removeItem(getKey(key));
}

export function clear() {
  storage.clear();
}
