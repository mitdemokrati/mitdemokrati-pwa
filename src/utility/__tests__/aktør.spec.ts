import { parseValueFromBiography } from '../aktoer';

const PARTY_KEY = 'party';

describe('the parseValueFromBiography utility method', () => {
  it('returns an empty string if input is empty', () => {
    const input = '';

    const result = parseValueFromBiography(input, PARTY_KEY);

    expect(result).toBe('');
  });

  it('returns an empty string if input has no <party></party> section', () => {
    const input = '<notAParty>TestInfo</notAParty>';

    const result = parseValueFromBiography(input, PARTY_KEY);

    expect(result).toBe('');
  });

  it('returns the content of <party></party> tags in input', () => {
    const input = '<notParty>NotParty</notParty><party>Party</party>';

    const result = parseValueFromBiography(input, PARTY_KEY);

    expect(result).toBe('Party');
  });
});
