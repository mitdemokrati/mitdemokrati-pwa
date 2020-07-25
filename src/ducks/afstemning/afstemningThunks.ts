import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { addAfstemningList } from './afstemningActions';
import { IApplicationState } from '../store';
import { getAktørList } from '../aktør/aktørThunks';
import {
  enrichAfstemningList,
  loadAfstemningList,
  loadPreviousAfstemningList,
} from '../../logic/afstemningLogic';

// Thunks
export const getNewestAfstemningList = (
  count?: number
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch
) => {
  const afstemningList = await loadAfstemningList(count);

  dispatch(addAfstemningList(afstemningList));

  getEnrichedAfstemningList(afstemningList, dispatch);
};

export const getPreviousAfstemningList = (
  oldestAfstemning: Afstemning,
  count?: number
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch
) => {
  const afstemningList = await loadPreviousAfstemningList(
    oldestAfstemning,
    count
  );

  dispatch(addAfstemningList(afstemningList));

  getEnrichedAfstemningList(afstemningList, dispatch);
};

async function getEnrichedAfstemningList(
  afstemningList: Afstemning[],
  dispatch: ThunkDispatch<IApplicationState, {}, AnyAction>
) {
  const enrichedAfstemningList = await enrichAfstemningList(afstemningList);

  dispatch(addAfstemningList(enrichedAfstemningList));

  const uniqueAktørIdList = getUniqueAktørIdList(enrichedAfstemningList);

  dispatch(getAktørList(uniqueAktørIdList));
}

function getUniqueAktørIdList(afstemningList: Afstemning[]) {
  const forslagStillerIdList = afstemningList
    .map((afstemning) => afstemning.forslagStillerId || [])
    .flat()
    .filter(Boolean);

  const stemmeAktørIdList = afstemningList
    .map((afstemning) => afstemning.stemmeList.map((stemme) => stemme.aktørid))
    .flat()
    .filter(Boolean);

  const uniqueAktørIdList = Array.from(
    new Set([...forslagStillerIdList, ...stemmeAktørIdList])
  );

  return uniqueAktørIdList;
}
