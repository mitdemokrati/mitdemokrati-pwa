// eslint-disable-next-line import/no-unresolved
import lodashChunk from 'lodash/chunk';

export const mapArray = <T>(array: T[], key: keyof T) => {
  return array.reduce((map, item) => {
    map.set(item[key], item);
    return map;
  }, new Map<unknown, T>());
};

export const chunkArray = <T>(array: T[], chunkSize: number) => {
  return lodashChunk(array, chunkSize);
};

export const uniqueArray = <T>(array: T[]) => {
  return Array.from(new Set(array));
};
