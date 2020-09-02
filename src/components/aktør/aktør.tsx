import React from 'react';
import { useSelector } from 'react-redux';

import { selectAktørList } from '../../ducks/aktør/aktørSelectors';
import { AktørPhoto } from './aktørPhoto';

export const Aktør = () => {
  const aktørList = useSelector(selectAktørList);

  const aktør = aktørList[30];

  if (!aktør) {
    return null;
  }

  return (
    <div>
      <h1>{aktør.navn}</h1>

      <h3>{aktør.parti}</h3>

      <AktørPhoto photoUrl={aktør.photoUrl} name={aktør.navn} />

      <p>{aktør.valgkreds}</p>

      <div>
        <a href={`tel:${aktør.phoneNumber}`}>{aktør.phoneNumber}</a>
      </div>

      <div>
        <a href={`mailto:${aktør.email}`}>{aktør.email}</a>
      </div>

      <div>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://ft.dk${aktør.folketingLink}`}
        >
          ft.dk{aktør.folketingLink}
        </a>
      </div>
    </div>
  );
};
