import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { addAfstemningList } from './afstemningActions';
import { IApplicationState } from '../store/store';
import { getAktoerList } from '../aktoer/aktoerThunks';
import {
  enrichAfstemningList,
  loadAfstemningList,
  loadPreviousAfstemningList,
} from '../../logic/afstemningLogic';
import { uniqueArray } from '../../utility/misc';

// Thunks
export const getNewestAfstemningList =
  (
    count?: number
  ): ThunkAction<
    Promise<void>,
    IApplicationState,
    Record<string, unknown>,
    AnyAction
  > =>
  async (dispatch) => {
    loadAfstemningList(count).then((afstemningList) => {
      if (afstemningList.length < 1) {
        return;
      }

      dispatch(addAfstemningList(afstemningList));
      dispatch(getEnrichedAfstemningList(afstemningList));
    });
  };

export const getPreviousAfstemningList =
  (
    oldestAfstemning: Afstemning,
    count?: number
  ): ThunkAction<
    Promise<void>,
    IApplicationState,
    Record<string, unknown>,
    AnyAction
  > =>
  async (dispatch) => {
    const afstemningList = await loadPreviousAfstemningList(
      oldestAfstemning,
      count
    );

    dispatch(addAfstemningList(afstemningList));
    dispatch(getEnrichedAfstemningList(afstemningList));
  };

function getEnrichedAfstemningList(
  afstemningList: Afstemning[]
): ThunkAction<
  Promise<void>,
  IApplicationState,
  Record<string, unknown>,
  AnyAction
> {
  return async (dispatch) => {
    const enrichedAfstemningList = await enrichAfstemningList(afstemningList);

    dispatch(addAfstemningList(enrichedAfstemningList));

    const uniqueAktoerIdList = getUniqueAktoerIdList(enrichedAfstemningList);

    dispatch(getAktoerList(uniqueAktoerIdList));
  };
}

function getUniqueAktoerIdList(afstemningList: Afstemning[]) {
  const allAktoerIdList = afstemningList
    .map(getAllAktoerIdList)
    .flat()
    .filter(Boolean);

  const uniqueAktoerIdList = uniqueArray(allAktoerIdList);

  return uniqueAktoerIdList;
}

function getAllAktoerIdList(afstemning: Afstemning) {
  return [
    ...(afstemning.forslagStillerId || []),
    ...afstemning.stemmeList.map((stemme) => stemme?.aktoerid),
  ];
}
