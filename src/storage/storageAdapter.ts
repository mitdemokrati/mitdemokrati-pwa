import { STORAGE_KEY } from './../config';

const storage = window.localStorage;

const getKey = (key: string): string => `${STORAGE_KEY}/${key}`;

export function get(key: string): any | null {
  const stored = storage.getItem(getKey(key));

  return stored && JSON.parse(stored);
}

export function set(key: string, value: string | object | Array<any>) {
  const stored = typeof value === 'string' ? value : JSON.stringify(value);

  storage.setItem(getKey(key), stored);
}

export function remove(key: string) {
  storage.removeItem(getKey(key));
}

export function clear() {
  storage.clear();
}
