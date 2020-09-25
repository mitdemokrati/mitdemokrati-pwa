import { getStemmeTypeString } from '../stemmeType';

describe('the getStemmeTypeString utility method', () => {
  it('return "For" when passed 1', () => {
    expect(getStemmeTypeString(1)).toBe('For');
  });

  it('return "Imod" when passed 2', () => {
    expect(getStemmeTypeString(2)).toBe('Imod');
  });

  it('return "Fraværende" when passed 3', () => {
    expect(getStemmeTypeString(3)).toBe('Fraværende');
  });

  it('return "Blank" when passed 4', () => {
    expect(getStemmeTypeString(4)).toBe('Blank');
  });

  it('return empty string when passed anything else', () => {
    expect(getStemmeTypeString(5)).toBe('');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getStemmeTypeString()).toBe('');
  });
});
