import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { addAktoerList } from './aktoerActions';
import { selectAktoerMap } from './aktoerSelectors';
import { IApplicationState } from '../store/store';
import { loadAktoerList } from '../../logic/aktoerLogic';
import { filterNotInMap } from '../../utility/misc';

// Thunks
export const getAktoerList =
  (
    aktoerIdList: number[]
  ): ThunkAction<
    Promise<void>,
    IApplicationState,
    Record<string, unknown>,
    AnyAction
  > =>
  async (dispatch, getState) => {
    const state = getState();
    const stateAktoerMap = selectAktoerMap(state);

    const missingAktoerIdList = filterNotInMap(aktoerIdList, stateAktoerMap);

    if (missingAktoerIdList.length < 1) {
      return;
    }

    const aktoerList = await loadAktoerList(missingAktoerIdList);

    dispatch(addAktoerList(aktoerList));
  };
