import { AnyAction } from 'redux';

// eslint-disable-next-line no-shadow
export enum AktoerActionType {
  ADD_AKTOER_LIST = 'mitdemokrati_pwa/aktoer/ADD_AKTOER_LIST',
}

export type AktoerAction = AnyAction & {
  payload: unknown;
  type: AktoerActionType;
};

export type AddAktoerListAction = AktoerAction & {
  payload: { aktoerList: Aktoer[] };
};

// Action Creators
export const addAktoerList = (aktoerList: Aktoer[]): AddAktoerListAction => {
  return {
    payload: { aktoerList },
    type: AktoerActionType.ADD_AKTOER_LIST,
  };
};
