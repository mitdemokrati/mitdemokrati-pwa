import React, { useState } from 'react';

import { Stemme } from '../stemme/stemme';
import { parseDateToLocale } from '../../utility/date';

import './afstemning.less';
import { ForslagStiller } from '../forslagstiller/forslagStiller';
// import { PieChart } from '../charts/piechart';
// import {
//   parseVoteSpreadFromKonklusion,
//   parseVoteSpreadFromStemmeList,
// } from '../../utility/afstemningHelper';

type AfstemningProps = {
  afstemning: Afstemning;
};

export const Afstemning = ({ afstemning }: AfstemningProps) => {
  const [visibility, toggleVisibility] = useState(false);

  const toggleSection = visibility ? (
    <>
      <p>
        {afstemning.resume || 'Ingen yderligere information fra Folketinget'}
      </p>

      <ForslagStiller forslagStillerIdList={afstemning.forslagStillerId} />

      <Stemme
        konklusion={afstemning.konklusion}
        stemmeList={afstemning.stemmeList}
        vedtaget={afstemning.vedtaget}
      />
    </>
  ) : null;

  return (
    <article className="afstemning">
      <button
        className="afstemning__button"
        onClick={() => toggleVisibility(!visibility)}
        type="button"
      >
        <p>
          {parseDateToLocale(afstemning.dato)} - {afstemning.id}
        </p>

        <h3>{afstemning.titel}</h3>

        {toggleSection}
      </button>

      {/* <PieChart
        voteSpread={
          afstemning.stemmeList.length > 0
            ? parseVoteSpreadFromStemmeList(afstemning.stemmeList)
            : parseVoteSpreadFromKonklusion(afstemning.konklusion)
        }
      /> */}
    </article>
  );
};
