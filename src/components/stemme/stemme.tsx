import React from 'react';

import { parsePartySpreadFromKonklusion } from '../../utility/afstemning';
import { PartyLogo } from '../party/partyLogo';

import './stemme.less';

type StemmeProps = {
  konklusion: string;
};
export const Stemme = ({ konklusion }: StemmeProps): JSX.Element => {
  const partySpread = parsePartySpreadFromKonklusion(konklusion);

  return (
    <div className="stemme">
      {partySpread.for.length > 0 ? (
        <div>{partySpread.for.map(mapPartyLetter)}</div>
      ) : null}

      {partySpread.blank.length > 0 ? (
        <div>{partySpread.blank.map(mapPartyLetter)}</div>
      ) : null}

      {partySpread.imod.length > 0 ? (
        <div>{partySpread.imod.map(mapPartyLetter)}</div>
      ) : null}
    </div>
  );
};

function mapPartyLetter(letter: string) {
  return <PartyLogo partyLetter={letter} />;
}
