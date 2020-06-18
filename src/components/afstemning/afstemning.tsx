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
      <p>
        For stemmer:{' '}
        {afstemning.Stemme.filter((stemme) => stemme.typeid === 1).length}
      </p>
      <p>
        Imod stemmer:{' '}
        {afstemning.Stemme.filter((stemme) => stemme.typeid === 2).length}
      </p>
      <p>
        Blank stemmer:{' '}
        {afstemning.Stemme.filter((stemme) => stemme.typeid === 3).length}
      </p>
      <p>
        Fraværende stemmer:{' '}
        {afstemning.Stemme.filter((stemme) => stemme.typeid === 4).length}
      </p>
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
          {afstemning.Møde?.dato} - {afstemning.id}
        </p>

        <h3>{afstemning.Sagstrin?.Sag?.titel}</h3>
      </button>

      {toggleSection}
    </article>
  );
};
