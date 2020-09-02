import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { selectAfstemningList } from './afstemningSelectors';

import { addAfstemningList } from './afstemningActions';
import { IApplicationState } from '../store';
import { getAktørList } from '../aktør/aktørThunks';
import {
  enrichAfstemningList,
  loadAfstemningList,
  loadPreviousAfstemningList,
} from '../../logic/afstemningLogic';
import { uniqueArray } from '../../utility/misc';
import {
  loadAfstemningListFromStorage,
  saveAfstemningListToStorage,
} from '../../storage/storage';

// Thunks
export const getNewestAfstemningList = (
  count?: number
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch
) => {
  let fromServiceLoaded = false;

  loadAfstemningListFromStorage().then((afstemningList) => {
    if (!fromServiceLoaded) {
      dispatch(addAfstemningList(afstemningList));
    }
  });

  loadAfstemningList(count).then((afstemningList) => {
    fromServiceLoaded = true;
    dispatch(addAfstemningList(afstemningList));
    dispatch(getEnrichedAfstemningList(afstemningList));
  });
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
  dispatch(getEnrichedAfstemningList(afstemningList));
};

function getEnrichedAfstemningList(
  afstemningList: Afstemning[]
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> {
  return async (dispatch) => {
    const enrichedAfstemningList = await enrichAfstemningList(afstemningList);

    dispatch(addAfstemningList(enrichedAfstemningList));
    dispatch(saveCompleteAfstemningList());

    const uniqueAktørIdList = getUniqueAktørIdList(enrichedAfstemningList);

    dispatch(getAktørList(uniqueAktørIdList));
  };
}

function getUniqueAktørIdList(afstemningList: Afstemning[]) {
  const allAktørIdList = afstemningList
    .map(getAllAktørIdList)
    .flat()
    .filter(Boolean);

  const uniqueAktørIdList = uniqueArray(allAktørIdList);

  return uniqueAktørIdList;
}

function getAllAktørIdList(afstemning: Afstemning) {
  return [
    ...(afstemning.forslagStillerId || []),
    ...afstemning.stemmeList.map((stemme) => stemme.aktørid),
  ];
}

function saveCompleteAfstemningList(): ThunkAction<
  Promise<void>,
  IApplicationState,
  {},
  AnyAction
> {
  return async (_, getState) => {
    const state = getState();
    const completeAfstemningList = selectAfstemningList(state);

    saveAfstemningListToStorage(completeAfstemningList);
  };
}
