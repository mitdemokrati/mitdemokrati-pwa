import { parseParty } from '../party';

describe('the parseParty utility method', () => {
  it('returns an empty string if input is empty', () => {
    const input = '';

    const result = parseParty(input);

    expect(result).toBe('');
  });

  it('returns an empty string if input has no <party></party> section', () => {
    const input = '<notAParty>TestInfo</notAParty>';

    const result = parseParty(input);

    expect(result).toBe('');
  });

  it('returns the content of <party></party> tags in input', () => {
    const input = '<notParty>NotParty</notParty><party>Party</party>';

    const result = parseParty(input);

    expect(result).toBe('Party');
  });
});
