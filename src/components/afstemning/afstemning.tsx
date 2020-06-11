import React, { useState } from 'react';

import './afstemning.less';

type AfstemningProps = {
  afstemning: Afstemning;
};

export const Afstemning = ({ afstemning }: AfstemningProps) => {
  const [visibility, toggleVisibility] = useState(false);

  const toggleSection = visibility ? (
    <>
      <p>
        {afstemning.Sagstrin?.Sag?.resume ||
          'Ingen yderligere information fra Folketinget'}
      </p>

      <p>Forslaget er opstillet af {afstemning.forslagStillerId}</p>

      <p>Forslaget blev {afstemning.vedtaget ? 'vedtaget' : 'forkastet'}</p>
    </>
  ) : null;

  return (
    afstemning && (
      <article className="afstemning">
        <button
          className="afstemning__button"
          onClick={() => toggleVisibility(!visibility)}
          type="button"
        >
          <p>
            {afstemning.Møde?.dato} - {afstemning.id}
          </p>

          <h3>{afstemning.Sagstrin?.Sag?.titel}</h3>
        </button>

        {toggleSection}
      </article>
    )
  );
};
