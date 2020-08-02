// eslint-disable-next-line import/no-unresolved
import chunk from 'lodash/chunk';
import {
  chunkArray,
  mapArray,
  uniqueArray,
  filterNotInMap,
  groupBy,
} from '../misc';

jest.mock('lodash/chunk', () => ({
  default: jest.fn(),
}));

const testArray = [
  { id: 1, other: 1 },
  { id: 1, other: 2 },
  { id: 2 },
  { id: 3 },
];

describe('the chunkArray utility method', () => {
  it('wraps the chunk utility method from lodash', () => {
    chunkArray(testArray, 2);

    expect(chunk).toHaveBeenCalledTimes(1);
    expect(chunk).toHaveBeenCalledWith(testArray, 2);
  });
});

describe('the filterNotInMap utility method', () => {
  it('returns empty result on empty input', () => {
    const result = filterNotInMap([], new Map());

    expect(result).toEqual([]);
  });

  it('returns only values that are not in the map', () => {
    const list = [1, 1, 2, 3];
    const map = new Map([
      [2, {}],
      [3, {}],
    ]);

    const result = filterNotInMap(list, map);

    expect(result).toEqual([1, 1]);
  });
});

describe('the groupBy utility method', () => {
  it('returns empty map on empty input', () => {
    const result = groupBy([], '');

    expect(result).toEqual(new Map());
  });

  it('returns map of itemLists groups by key', () => {
    const expected = new Map([
      [1, testArray.slice(0, 2)],
      [2, testArray.slice(2, 3)],
      [3, testArray.slice(3, 4)],
    ]);

    const result = groupBy(testArray, 'id');

    expect(result).toEqual(expected);
  });
});

describe('the mapArray utility method', () => {
  it('throws error when converting array with duplicate keyed items', () => {
    expect(() => mapArray(testArray, 'id')).toThrowError(
      Error("MitDemokrati: mapArray can't handle duplicate keys")
    );
  });

  it('converts an array of objects into a map with a specified property as key', () => {
    const expectedMap = new Map([
      [1, { id: 1, other: 2 }],
      [2, { id: 2 }],
      [3, { id: 3 }],
    ]);

    const map = mapArray(testArray.slice(1), 'id');

    expect(map).toEqual(expectedMap);
  });
});

describe('the uniqueArray utility method', () => {
  it('removes duplicates from an array of numbers', () => {
    const numberArray = [1, 1, 2, 3];

    const result = uniqueArray(numberArray);

    expect(result).toEqual([1, 2, 3]);
  });

  it('removes duplicates from an array of strings', () => {
    const stringArray = ['a', 'a', 'b', 'c'];

    const result = uniqueArray(stringArray);

    expect(result).toEqual(['a', 'b', 'c']);
  });
});
