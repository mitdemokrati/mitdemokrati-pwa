import React from 'react';
import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
  parsePartySpreadFromKonklusion,
} from '../../utility/afstemning';

type StemmeProps = {
  konklusion: string;
  stemmeList: Stemme[];
};
export const Stemme = ({ konklusion, stemmeList }: StemmeProps) => {
  const voteSpread =
    stemmeList.length > 0
      ? parseVoteSpreadFromStemmeList(stemmeList)
      : parseVoteSpreadFromKonklusion(konklusion);

  const partySpread = parsePartySpreadFromKonklusion(konklusion);

  const partySpreadStrings = {
    for: partySpread.for.length > 0 ? ` (${partySpread.for.join(', ')})` : '',
    imod:
      partySpread.imod.length > 0 ? ` (${partySpread.imod.join(', ')})` : '',
    blank:
      partySpread.blank.length > 0 ? ` (${partySpread.blank.join(', ')})` : '',
  };

  return (
    <div>
      <p>For: {`${voteSpread.for}${partySpreadStrings.for}`}</p>
      <p>Imod: {`${voteSpread.imod}${partySpreadStrings.imod}`}</p>
      <p>Blanke: {`${voteSpread.blank}${partySpreadStrings.blank}`}</p>
      <p>Fraværende: {voteSpread.fraværende}</p>
    </div>
  );
};
