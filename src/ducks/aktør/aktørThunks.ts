import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { addAktørList } from './aktørActions';
import { selectAktørMap } from './aktørSelectors';
import { IApplicationState } from '../store';
import { loadAktørList } from '../../logic/aktørLogic';
import { filterNotInMap } from '../../utility/misc';

// Thunks
export const getAktørList = (
  aktørIdList: number[]
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const stateAktørMap = selectAktørMap(state);

  const missingAktørIdList = filterNotInMap(aktørIdList, stateAktørMap);

  if (missingAktørIdList.length < 1) {
    return;
  }

  const aktørList = await loadAktørList(missingAktørIdList);

  dispatch(addAktørList(aktørList));
};
