import { calculateVoteSpread, calculatePartyVoteSpread } from '../votes';

describe('the calculateVoteSpread method', () => {
  const defaultVoteSpread = {
    for: 0,
    imod: 0,
    blank: 0,
    fraværende: 0,
  };

  it('returns default voteSpread on empty stemmeList', () => {
    const voteSpread = calculateVoteSpread([]);

    expect(voteSpread).toEqual(defaultVoteSpread);
  });

  it('returns expected voteSpread', () => {
    const stemmeList: Stemme[] = [
      { afstemningid: 1, aktoerid: 1, typeid: 1 },
      { afstemningid: 1, aktoerid: 2, typeid: 4 },
      { afstemningid: 1, aktoerid: 3, typeid: 5 },
    ];

    const expectedVoteSpread: VoteSpread = {
      for: 1,
      imod: 0,
      blank: 1,
      fraværende: 0,
    };

    const voteSpread = calculateVoteSpread(stemmeList);

    expect(voteSpread).toEqual(expectedVoteSpread);
  });
});

describe('the calculate party vote spread method', () => {
  it('returns empty result on empty input', () => {
    const stemmeList: Stemme[] = [];
    const aktoerPartyMap: AktoerPartyMap = new Map();

    const partyVoteSpread = calculatePartyVoteSpread(
      stemmeList,
      aktoerPartyMap
    );

    expect(partyVoteSpread).toEqual({});
  });

  it('returns expected partyVoteSpread', () => {
    const expectedPartyVoteSpread: PartyVoteSpread = {
      PartyA: { for: 1, imod: 0, blank: 0, fraværende: 0 },
      PartyB: { for: 0, imod: 2, blank: 0, fraværende: 0 },
      'Uden for parti': { for: 0, imod: 0, blank: 1, fraværende: 1 },
    };

    const aktoerPartyMap: AktoerPartyMap = new Map([
      [1, 'PartyA'],
      [2, 'PartyB'],
      [3, 'PartyB'],
      [4, ''],
      [5, ''],
    ]);

    const stemmeList: Stemme[] = [
      { afstemningid: 1, aktoerid: 1, typeid: 1 },
      { afstemningid: 1, aktoerid: 2, typeid: 2 },
      { afstemningid: 1, aktoerid: 3, typeid: 2 },
      { afstemningid: 1, aktoerid: 4, typeid: 3 },
      { afstemningid: 1, aktoerid: 5, typeid: 4 },
    ];

    const partyVoteSpread = calculatePartyVoteSpread(
      stemmeList,
      aktoerPartyMap
    );

    expect(partyVoteSpread).toEqual(expectedPartyVoteSpread);
  });
});
