import React from 'react';
import { useSelector } from 'react-redux';
import { selectAktørMap } from '../../ducks/aktør/aktørSelectors';

type ForslagStillerProps = {
  forslagStillerIdList: number[] | undefined;
};
export const ForslagStiller = ({
  forslagStillerIdList,
}: ForslagStillerProps) => {
  if (!forslagStillerIdList || forslagStillerIdList.length < 1) {
    return null;
  }

  const aktørMap = useSelector(selectAktørMap);

  const forslagStillerString = getForslagStillerString(
    forslagStillerIdList,
    aktørMap
  );

  return <p>Forslaget er opstillet af {forslagStillerString}</p>;
};

function getForslagStillerString(
  forslagStillerIdList: number[],
  aktørMap: Map<number, Aktør>
) {
  return forslagStillerIdList.reduce(
    (resultString, forslagStillerId, index) => {
      const aktør = aktørMap.get(forslagStillerId);

      if (!aktør) {
        return resultString;
      }

      const aktørPartiString = aktør.parti ? ` (${aktør.parti})` : '';

      return index === 0
        ? `${aktør.navn}${aktørPartiString}`
        : `${resultString}, ${aktør.navn}${aktørPartiString}`;
    },
    ''
  );
}
