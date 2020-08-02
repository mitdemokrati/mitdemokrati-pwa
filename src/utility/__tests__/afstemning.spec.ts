import {
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
      'TestStringFiller For stemte 79, imod stemte 30, og hverken for eller imod stemte 20 MoreTestFiller';
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
    const konklusion = 'imod stemte 79';
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
    const konklusion = 'hverken for eller imod stemte h6';

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
      { afstemningid: 1, aktørid: 1, typeid: 1 },
      { afstemningid: 1, aktørid: 2, typeid: 2 },
      { afstemningid: 1, aktørid: 3, typeid: 3 },
      { afstemningid: 1, aktørid: 4, typeid: 4 },
      { afstemningid: 1, aktørid: 5, typeid: 5 },
      { afstemningid: 1, aktørid: 5, typeid: 1 },
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

  it('parses konklusion with an aktør outside a party', () => {
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
});
