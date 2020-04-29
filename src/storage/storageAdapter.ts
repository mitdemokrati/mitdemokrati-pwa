import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { STORAGE_KEY } from './../config';

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

export function get(key: string): any | null {
  const stored = storage.getItem(getKey(key));

  return stored && JSON.parse(decompressFromUTF16(stored));
}

export function set(key: string, value: string | object | Array<any>) {
  const stored = typeof value === 'string' ? value : JSON.stringify(value);

  storage.setItem(getKey(key), compressToUTF16(stored));
}

export function remove(key: string) {
  storage.removeItem(getKey(key));
}

export function clear() {
  storage.clear();
}
