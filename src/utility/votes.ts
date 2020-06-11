const DEFAULT_PARTY_NAME = 'Uden for parti';

const DEFAULT_VOTE_SPREAD = { for: 0, imod: 0, blank: 0, fraværende: 0 };

function stemmeListReducer(voteSpread: VoteSpread, stemme: Stemme): VoteSpread {
  switch (stemme.typeid) {
    case 1:
      return { ...voteSpread, for: voteSpread.for + 1 };

    case 2:
      return { ...voteSpread, imod: voteSpread.imod + 1 };

    case 3:
      return { ...voteSpread, blank: voteSpread.blank + 1 };

    case 4:
      return { ...voteSpread, fraværende: voteSpread.fraværende + 1 };

    default:
      return voteSpread;
  }
}

export function calculateVoteSpread(stemmeList: Stemme[]): VoteSpread {
  return stemmeList.reduce(stemmeListReducer, DEFAULT_VOTE_SPREAD);
}

export function calculatePartyVoteSpread(
  stemmeList: Stemme[],
  aktørPartyMap: AktørPartyMap
): PartyVoteSpread {
  const defaultPartyVoteSpread: PartyVoteSpread = {};

  return stemmeList.reduce((partyVoteSpread, stemme) => {
    const aktørParty = aktørPartyMap.get(stemme.aktørid) || DEFAULT_PARTY_NAME;
    const oldPartyVoteSpread =
      partyVoteSpread[aktørParty] || DEFAULT_VOTE_SPREAD;

    return {
      ...partyVoteSpread,
      [aktørParty]: stemmeListReducer(oldPartyVoteSpread, stemme),
    };
  }, defaultPartyVoteSpread);
}
