import React from 'react';
import { parsePartySpreadFromKonklusion } from '../../utility/afstemning';

import './stemme.less';
import { PartyLogo } from '../party/partyLogo';

type StemmeProps = {
  konklusion: string;
  stemmeList: Stemme[];
};
export const Stemme = ({ konklusion, stemmeList }: StemmeProps) => {
  const partySpread =
    stemmeList.length > 0
      ? parsePartySpreadFromKonklusion(konklusion) // TODO: Change to parse from stemmeList
      : parsePartySpreadFromKonklusion(konklusion);

  return (
    <div className="stemme">
      {partySpread.for.length > 0 ? (
        <div>{partySpread.for.map(mapPartyLetter)}</div>
      ) : null}

      {partySpread.imod.length > 0 ? (
        <div>{partySpread.imod.map(mapPartyLetter)}</div>
      ) : null}

      {partySpread.blank.length > 0 ? (
        <div>{partySpread.blank.map(mapPartyLetter)}</div>
      ) : null}
    </div>
  );
};

function mapPartyLetter(letter: string) {
  return <PartyLogo partyLetter={letter} />;
}
