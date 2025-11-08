import React from 'react';
import { useSelector } from 'react-redux';
import { selectAktoerMap } from '../../ducks/aktoer/aktoerSelectors';

type ForslagStillerProps = {
  forslagStillerIdList: number[] | undefined;
};
export const ForslagStiller = ({
  forslagStillerIdList,
}: ForslagStillerProps): JSX.Element | null => {
  if (!forslagStillerIdList || forslagStillerIdList.length < 1) {
    return null;
  }

  const aktoerMap = useSelector(selectAktoerMap);

  const forslagStillerString = getForslagStillerString(
    forslagStillerIdList,
    aktoerMap
  );

  return <p>Forslaget er opstillet af {forslagStillerString}</p>;
};

function getForslagStillerString(
  forslagStillerIdList: number[],
  aktoerMap: Map<number, Aktoer>
) {
  return forslagStillerIdList.reduce(
    (resultString, forslagStillerId, index) => {
      const aktoer = aktoerMap.get(forslagStillerId);

      if (!aktoer) {
        return resultString;
      }

      const aktoerPartiString = aktoer.parti ? ` (${aktoer.parti})` : '';

      return index === 0
        ? `${aktoer.navn}${aktoerPartiString}`
        : `${resultString}, ${aktoer.navn}${aktoerPartiString}`;
    },
    ''
  );
}
