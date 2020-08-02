import { parseDateToLocale } from '../date';

jest.mock('memize', () => ({ default: (f: (s: string) => string) => f }));

describe('the parseDateToLocale utility method', () => {
  it('returns an empty string if input is empty', () => {
    const result = parseDateToLocale('');

    expect(result).toBe('');
  });

  it('parses the input and returns danish locale date string', () => {
    const input = '2000-01-01T12:00:00Z';
    const expected = '1.1.2000';

    const result = parseDateToLocale(input);

    expect(result).toBe(expected);
  });
});
