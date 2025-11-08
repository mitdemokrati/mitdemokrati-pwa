import {
  parsePartySpreadFromStemmeList,
  parsePartySpreadFromKonklusion,
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
} from '../afstemning';

const emptyResult = { for: 0, imod: 0, blank: 0, fraværende: 0 };

describe('the parseVoteSpreadFromKonklusion utility method', () => {
  it('parses an empty string into a VoteSpread object with 179 fraværende', () => {
    const result = parseVoteSpreadFromKonklusion('');

    expect(result).toEqual({ ...emptyResult, fraværende: 179 });
  });

  it('parses a full konklusion string into the correct VoteSpread object', () => {
    const konklusion =
      '\nTestStringFiller For stemte 79,\n imod stemte 30,\n hverken for eller imod stemte 20 MoreTestFiller';
    const expected = {
      for: 79,
      imod: 30,
      blank: 20,
      fraværende: 50,
    };

    const result = parseVoteSpreadFromKonklusion(konklusion);

    expect(result).toEqual(expected);
  });

  it('parses a string with only one key into the correct VoteSpread object', () => {
    const konklusion = '\n\n, imod stemte 79';
    const expected = {
      for: 0,
      imod: 79,
      blank: 0,
      fraværende: 100,
    };

    const result = parseVoteSpreadFromKonklusion(konklusion);

    expect(result).toEqual(expected);
  });

  it('parses a bad string with 0 instead of NaN', () => {
    const konklusion = ', hverken for eller imod stemte h6';

    const result = parseVoteSpreadFromKonklusion(konklusion);

    expect(result).toEqual({ ...emptyResult, fraværende: 179 });
  });
});

describe('the parseVoteSpreadFromStemmeList utility method', () => {
  it('parses an empty Stemme[] into a VoteSpread object', () => {
    const result = parseVoteSpreadFromStemmeList([]);

    expect(result).toEqual(emptyResult);
  });

  it('parses a Stemme[] with values into a VoteSpread object', () => {
    const stemmeList: Stemme[] = [
      { afstemningid: 1, aktoerid: 1, typeid: 1 },
      { afstemningid: 1, aktoerid: 2, typeid: 2 },
      { afstemningid: 1, aktoerid: 3, typeid: 3 },
      { afstemningid: 1, aktoerid: 4, typeid: 4 },
      { afstemningid: 1, aktoerid: 5, typeid: 5 },
      { afstemningid: 1, aktoerid: 5, typeid: 1 },
    ];
    const expected = {
      for: 2,
      imod: 1,
      fraværende: 1,
      blank: 1,
    };

    const result = parseVoteSpreadFromStemmeList(stemmeList);

    expect(result).toEqual(expected);
  });
});

describe('the parsePartySpreadFromKonklusion utility method', () => {
  it('parses an empty string into an empty PartySpread', () => {
    const result = parsePartySpreadFromKonklusion('');

    expect(result).toEqual({ for: [], imod: [], blank: [] });
  });

  it('parses konklusion with some parties into correct PartySpread', () => {
    const input =
      'for stemte x (V og DF), imod stemte y (S, SF), hverken for eller imod stemte z (Ø)';
    const expected = {
      for: ['V', 'DF'],
      imod: ['S', 'SF'],
      blank: ['Ø'],
    };

    const result = parsePartySpreadFromKonklusion(input);

    expect(result).toEqual(expected);
  });

  it('parses konklusion with an aktoer outside a party', () => {
    const input =
      'for stemte x (S og Test Testman (UFG)), imod stemte 0, hverken for eller imod stemte y (SF)';

    const expected = {
      for: ['S', 'Test Testman (Løsgænger)'],
      imod: [],
      blank: ['SF'],
    };

    const result = parsePartySpreadFromKonklusion(input);

    expect(result).toEqual(expected);
  });

  it('parses konklusion with an aktoer voting against party lines', () => {
    const input =
      'Forslaget blev vedtaget. For stemte 89 (SF, Test Testman (EL), KF, og ALT), imod stemte 1 (V), hverken for eller imod stemte 7 (EL, UFG).';

    const expected = {
      for: ['SF', 'KF', 'ALT', 'Test Testman (EL)'],
      imod: ['V'],
      blank: ['EL', 'UFG'],
    };

    const result = parsePartySpreadFromKonklusion(input);

    expect(result).toEqual(expected);
  });
});

describe('the parsePartySpreadFromStemmeList utility method', () => {
  const emptyPartySpread = {
    for: [],
    imod: [],
    blank: [],
  };

  it('return an empty partySpread on empty input', () => {
    const result = parsePartySpreadFromStemmeList([], new Map());

    expect(result).toEqual(emptyPartySpread);
  });

  it('returns an empty partySpread if no aktoer match found', () => {
    const result = parsePartySpreadFromStemmeList(
      [{ afstemningid: 1, aktoerid: 1, typeid: 1 }],
      new Map([[2, {} as Aktoer]])
    );

    expect(result).toEqual(emptyPartySpread);
  });

  it('returns a correct partySpread, without duplicates', () => {
    const expected = {
      ...emptyPartySpread,
      imod: ['S', 'V'],
      blank: ['oe'],
    };

    const inputList: Stemme[] = [
      { afstemningid: 1, aktoerid: 1, typeid: 2 },
      { afstemningid: 1, aktoerid: 2, typeid: 1 },
      { afstemningid: 1, aktoerid: 3, typeid: 4 },
      { afstemningid: 1, aktoerid: 5, typeid: 2 },
      { afstemningid: 1, aktoerid: 6, typeid: 3 },
      { afstemningid: 1, aktoerid: 7, typeid: 2 },
    ];
    const inputMap: Map<number, Aktoer> = new Map([
      [1, { parti: 'S' } as Aktoer],
      [3, { parti: 'oe' } as Aktoer],
      [5, { parti: 'V' } as Aktoer],
      [6, { parti: 'S' } as Aktoer],
      [7, { parti: 'V' } as Aktoer],
    ]);

    const result = parsePartySpreadFromStemmeList(inputList, inputMap);

    expect(result).toEqual(expected);
  });
});
