import { AnyAction } from 'redux';

// Action Types
export enum AfstemningActionType {
  ADD_AFSTEMNING_LIST = 'mitdemokrati_pwa/afstemning/ADD_AFSTEMNING_LIST',
}

export type AfstemningAction = AnyAction & {
  payload: unknown;
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
