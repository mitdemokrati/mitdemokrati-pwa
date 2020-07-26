import React, { useState } from 'react';

import { parseDateToLocale } from '../../utility/date';
import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
} from '../../utility/afstemning';

// import { PieChart } from '../charts/piechart';
import { Stemme } from '../stemme/stemme';
import { ForslagStiller } from '../forslagstiller/forslagStiller';
import { SmallPie } from '../charts/smallpie';

import './afstemning.less';

type AfstemningProps = {
  afstemning: Afstemning;
};

export const Afstemning = ({ afstemning }: AfstemningProps) => {
  const [visibility, toggleVisibility] = useState(false);

  const voteSpread =
    afstemning.stemmeList.length > 0
      ? parseVoteSpreadFromStemmeList(afstemning.stemmeList)
      : parseVoteSpreadFromKonklusion(afstemning.konklusion);

  const toggleSection = visibility ? (
    <>
      <p>
        {afstemning.resume || 'Ingen yderligere information fra Folketinget'}
      </p>

      <ForslagStiller forslagStillerIdList={afstemning.forslagStillerId} />

      <Stemme
        konklusion={afstemning.konklusion}
        stemmeList={afstemning.stemmeList}
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
        <div className="afstemning__header">
          <p>{parseDateToLocale(afstemning.dato)}</p>

          <div className="afstemning__header--pie">
            <span>{afstemning.vedtaget ? 'Vedtaget' : 'Forkastet'}</span>

            <SmallPie voteSpread={voteSpread} size={30} />
          </div>
        </div>

        <h3>{afstemning.titel}</h3>

        {toggleSection}
      </button>

      {/* <PieChart voteSpread={voteSpread} /> */}
    </article>
  );
};
