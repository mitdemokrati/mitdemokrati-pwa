import React from 'react';

/* eslint-disable import/no-unresolved */
import altLogo from 'url:../../assets/parties/alternativetlogo70.png';
import ddLogo from 'url:../../assets/parties/danmarksdemokraterne70.png';
import dfLogo from 'url:../../assets/parties/danskfolkepartilogo70.png';
import fgLogo from 'url:../../assets/parties/friegroenne70.png';
import kfLogo from 'url:../../assets/parties/detkonservativefolkepartilogo70.png';
import elLogo from 'url:../../assets/parties/enhedslistenlogo70.png';
import iaLogo from 'url:../../assets/parties/inuitpartilogo70.png';
import jLogo from 'url:../../assets/parties/javnapartilogo70.png';
import laLogo from 'url:../../assets/parties/liberalalliancelogo70.png';
import nbLogo from 'url:../../assets/parties/nyeborgerligepartilogo70.png';
import rvLogo from 'url:../../assets/parties/radikalevenstrelogo70.png';
import bLogo from 'url:../../assets/parties/sambandspartilogo70.png';
import siLogo from 'url:../../assets/parties/siumutpartilogo70.png';
import sLogo from 'url:../../assets/parties/socialdemokratietlogo70.png';
import sfLogo from 'url:../../assets/parties/socialistiskfolkepartilogo70.png';
import vLogo from 'url:../../assets/parties/venstrelogo70.png';
/* eslint-enable import/no-unresolved */

type PartyLogoProps = {
  partyLetter: string;
};
export const PartyLogo = ({
  partyLetter,
}: PartyLogoProps): JSX.Element | null => {
  switch (partyLetter) {
    case 'ALT':
      return <img src={altLogo} alt="Alternativet" />;

    case 'DD':
      return <img src={ddLogo} alt="Danmarksdemokraterne" />;

    case 'DF':
      return <img src={dfLogo} alt="Dansk Folkeparti" />;

    case 'KF':
      return <img src={kfLogo} alt="Det Konservative Folkeparti" />;

    case 'EL':
      return <img src={elLogo} alt="Enhedslisten" />;

    case 'FG':
      return <img src={fgLogo} alt="Frie Grønne" />;

    case 'IA':
      return <img src={iaLogo} alt="Inuit Ataqatigiit" />;

    case 'J':
      return <img src={jLogo} alt="Javnaðarflokkurin" />;

    case 'LA':
      return <img src={laLogo} alt="Liberal Alliance" />;

    case 'NB':
      return <img src={nbLogo} alt="Nye Borgerlige" />;

    case 'B':
      return <img src={bLogo} alt="Sambandsflokkurin" />;

    case 'SI':
      return <img src={siLogo} alt="Siumut" />;

    case 'RV':
      return <img src={rvLogo} alt="Radikale Venstre" />;

    case 'S':
      return <img src={sLogo} alt="Socialdemokratiet" />;

    case 'SF':
      return <img src={sfLogo} alt="Socialistisk Folkeparti" />;

    case 'V':
      return <img src={vLogo} alt="Venstre" />;

    default:
      return <p>{partyLetter.replace('UFG', 'Løsgænger')}</p>;
  }
};
