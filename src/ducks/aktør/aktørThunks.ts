import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { addAktørList } from './aktørActions';
import { selectAktørMap } from './aktørSelectors';
import { IApplicationState } from '../store';
import { loadAktørList } from '../../logic/aktørLogic';

// Thunks
export const getAktørList = (
  aktørIdList: number[]
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const stateAktørMap = selectAktørMap(getState());

  const missingAktørIdList = aktørIdList.filter(
    (aktørId) => !stateAktørMap.has(aktørId)
  );

  if (missingAktørIdList.length < 1) {
    return;
  }

  const aktørList = await loadAktørList(missingAktørIdList);

  dispatch(addAktørList(aktørList));
};
