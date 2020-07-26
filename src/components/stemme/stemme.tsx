import React from 'react';
import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
} from '../../utility/afstemning';

type StemmeProps = {
  konklusion: string;
  stemmeList: Stemme[];
  vedtaget: boolean;
};
export const Stemme = ({ konklusion, stemmeList, vedtaget }: StemmeProps) => {
  const voteSpread =
    stemmeList.length > 0
      ? parseVoteSpreadFromStemmeList(stemmeList)
      : parseVoteSpreadFromKonklusion(konklusion);

  return (
    <>
      <p>Forslaget blev {vedtaget ? 'vedtaget' : 'forkastet'}</p>

      <div>
        <p>For: {voteSpread.for}</p>
        <p>Imod: {voteSpread.imod}</p>
        <p>Blanke: {voteSpread.blank}</p>
        <p>Fraværende: {voteSpread.fraværende}</p>
      </div>
    </>
  );
};
