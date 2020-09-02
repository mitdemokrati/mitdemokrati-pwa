// eslint-disable-next-line import/no-unresolved
import chunk from 'lodash/chunk';

export const chunkArray = <T>(array: T[], chunkSize: number) => {
  return chunk(array, chunkSize);
};

export const filterNotInMap = <T>(array: number[], map: Map<number, T>) =>
  array && map && array.filter((key) => !map.has(key));

export const groupBy = <T>(array: T[], key: keyof T): Map<string, T[]> =>
  array &&
  array.reduce((map, item) => {
    const group = map.get(item[key]) || [];

    map.set(item[key], [...group, item]);

    return map;
  }, new Map());

export const mapArray = <T extends object>(array: T[], key: keyof T) =>
  array &&
  array.reduce((map, item) => {
    if (map.has(item[key])) {
      throw Error("MitDemokrati: mapArray can't handle duplicate keys");
    }

    map.set(item[key], item);
    return map;
  }, new Map<unknown, T>());

export const uniqueArray = <T extends string | number>(array: T[]) =>
  array && Array.from(new Set(array));
