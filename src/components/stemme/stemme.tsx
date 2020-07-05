import React from 'react';
import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
} from '../../utility/afstemningHelper';

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
        <p>For stemmer: {voteSpread.for}</p>
        <p>Imod stemmer: {voteSpread.imod}</p>
        <p>Blank stemmer: {voteSpread.blank}</p>
        <p>Fraværende stemmer: {voteSpread.fraværende}</p>
      </div>
    </>
  );
};
