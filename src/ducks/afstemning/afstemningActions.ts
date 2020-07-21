import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchLatestAfstemningList } from '../../services/afstemningService';

import { IApplicationState } from '../store';

// Action Types Enum
export enum AfstemningActionType {
  ADD_AFSTEMNING_LIST = 'mitdemokrati_pwa/afstemning/ADD_AFSTEMNING_LIST',
}

// Action Types
export type AfstemningAction = AnyAction & {
  payload: object;
  type: AfstemningActionType;
};

// Action Creators
export type AddAfstemningListAction = AfstemningAction & {
  payload: { afstemningList: Afstemning[] };
};
export const addAfstemningList = (
  afstemningList: Afstemning[]
): AddAfstemningListAction => ({
  payload: { afstemningList },
  type: AfstemningActionType.ADD_AFSTEMNING_LIST,
});

// Thunks
export const getNewestAfstemningList = (
  count: number
): ThunkAction<Promise<void>, IApplicationState, {}, AnyAction> => async (
  dispatch
) => {
  const afstemningList = await fetchLatestAfstemningList(count);

  dispatch(addAfstemningList(afstemningList));
};
