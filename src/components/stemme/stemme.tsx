import React from 'react';
import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
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

  return (
    <div>
      <p>For: {voteSpread.for}</p>
      <p>Imod: {voteSpread.imod}</p>
      <p>Blanke: {voteSpread.blank}</p>
      <p>Fraværende: {voteSpread.fraværende}</p>
    </div>
  );
};
