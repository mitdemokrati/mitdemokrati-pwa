import React, { useState } from 'react';

import { parseVoteSpreadFromKonklusion } from '../../utility/afstemning';

import { SmallPie } from '../charts/smallpie';
import { Stemme } from '../stemme/stemme';
import { StemmeCount } from '../stemme/stemmeCount';
// import { UserStemme } from '../user/userStemme';

import './afstemning.less';

type AfstemningProps = {
  afstemning: Afstemning;
};

export const Afstemning = ({ afstemning }: AfstemningProps) => {
  const [visibility, toggleVisibility] = useState(false);

  const voteSpread = parseVoteSpreadFromKonklusion(afstemning.konklusion);

  const toggleSection = visibility ? (
    <>
      {afstemning.resume
        ? afstemning.resume
            .split('\n\n')
            .map((partResume) => <p>{partResume}</p>)
        : 'Ingen yderligere information fra Folketinget'}

      <StemmeCount voteSpread={voteSpread} />

      <Stemme konklusion={afstemning.konklusion} />

      {/* <p>{afstemning.konklusion}</p> */}

      {/* <UserStemme afstemningId={afstemning.id} /> */}
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
        </div>
      </button>

      {toggleSection}
    </article>
  );
};
