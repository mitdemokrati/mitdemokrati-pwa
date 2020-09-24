import { AnyAction } from 'redux';

// eslint-disable-next-line no-shadow
export enum AfstemningActionType {
  ADD_AFSTEMNING_LIST = 'mitdemokrati_pwa/afstemning/ADD_AFSTEMNING_LIST',
}

export type AfstemningAction = AnyAction & {
  payload: unknown;
  type: AfstemningActionType;
};

export type AddAfstemningListAction = AfstemningAction & {
  payload: { afstemningList: Afstemning[] };
};

// Action Creators
export const addAfstemningList = (
  afstemningList: Afstemning[]
): AddAfstemningListAction => ({
  payload: { afstemningList },
  type: AfstemningActionType.ADD_AFSTEMNING_LIST,
});
