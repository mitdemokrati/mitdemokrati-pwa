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
        <div>
          <p>
            <b>For</b>
          </p>
          <div>
            {partySpread.for.map((letter) => (
              <PartyLogo partyLetter={letter} />
            ))}
          </div>
        </div>
      ) : null}

      {partySpread.imod.length > 0 ? (
        <div>
          <p>
            <b>Imod</b>
          </p>
          <p>
            {partySpread.imod.map((letter) => (
              <PartyLogo partyLetter={letter} />
            ))}
          </p>
        </div>
      ) : null}

      {partySpread.blank.length > 0 ? (
        <div>
          <p>
            <b>Blank</b>
          </p>
          <p>
            {partySpread.blank.map((letter) => (
              <PartyLogo partyLetter={letter} />
            ))}
          </p>
        </div>
      ) : null}
    </div>
  );
};
