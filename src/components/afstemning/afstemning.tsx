import React, { useState } from 'react';

import {
  parseVoteSpreadFromKonklusion,
  parseVoteSpreadFromStemmeList,
} from '../../utility/afstemning';

import { Stemme } from '../stemme/stemme';
import { ForslagStiller } from '../forslagstiller/forslagStiller';
import { SmallPie } from '../charts/smallpie';

import './afstemning.less';
import { StemmeCount } from '../stemme/stemmeCount';
// import { UserStemme } from '../user/userStemme';

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

      {/* <UserStemme /> */}
    </>
  ) : null;

  const afstemningClassName = visibility ? 'afstemning active' : 'afstemning';

  return (
    <article className={afstemningClassName}>
      <button
        className="afstemning__button"
        onClick={() => toggleVisibility(!visibility)}
        type="button"
      >
        <div className="afstemning__header">
          <div className="row">
            <h3>{afstemning.titel}</h3>

            <div className="afstemning__header--pie">
              <SmallPie voteSpread={voteSpread} size={52} />
            </div>
          </div>

          <div className="afstemning__header--vote">
            <span className="afstemning__header--status">
              {afstemning.vedtaget ? 'Vedtaget' : 'Forkastet'}
            </span>

            <StemmeCount voteSpread={voteSpread} />
          </div>
        </div>
      </button>

      {toggleSection}
    </article>
  );
};
