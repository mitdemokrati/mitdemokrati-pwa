import React from 'react';
import { useSelector } from 'react-redux';

import { selectAktoerList } from '../../ducks/aktoer/aktoerSelectors';
import { AktoerPhoto } from './aktoerPhoto';

export const Aktoer = (): JSX.Element | null => {
  const aktoerList = useSelector(selectAktoerList);

  const aktoer = aktoerList[30];

  if (!aktoer) {
    return null;
  }

  return (
    <div>
      <h1>{aktoer.navn}</h1>

      <h3>{aktoer.parti}</h3>

      <AktoerPhoto photoUrl={aktoer.photoUrl} name={aktoer.navn} />

      <p>{aktoer.valgkreds}</p>

      <div>
        <a href={`tel:${aktoer.phoneNumber}`}>{aktoer.phoneNumber}</a>
      </div>

      <div>
        <a href={`mailto:${aktoer.email}`}>{aktoer.email}</a>
      </div>

      <div>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://ft.dk${aktoer.folketingLink}`}
        >
          ft.dk{aktoer.folketingLink}
        </a>
      </div>
    </div>
  );
};
