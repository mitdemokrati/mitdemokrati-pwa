import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { addAfstemningList } from './afstemningActions';
import { IApplicationState } from '../store';
import { getAktørList } from '../aktør/aktørThunks';
import {
  enrichAfstemningList,
  loadAfstemningList,
} from '../../logic/afstemningLogic';

// Thunks
export const getNewestAfstemningList = (
  count: number
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch
) => {
  const afstemningList = await loadAfstemningList(count);

  dispatch(addAfstemningList(afstemningList));

  const enrichedAfstemningList = await enrichAfstemningList(afstemningList);

  dispatch(addAfstemningList(enrichedAfstemningList));

  const forslagStillerIdList = enrichedAfstemningList
    .map((afstemning) => afstemning.forslagStillerId || [])
    .filter(Boolean)
    .flat();

  dispatch(getAktørList(forslagStillerIdList));
};
