import { AnyAction } from 'redux';

// Action Types
export enum AktørActionType {
  ADD_AKTØR_LIST = 'mitdemokrati_pwa/aktør/ADD_AKTØR_LIST',
}

export type AktørAction = AnyAction & {
  payload: unknown;
  type: AktørActionType;
};

export type AddAktørListAction = AktørAction & {
  payload: { aktørList: Aktør[] };
};

// Action Creators
export const addAktørList = (aktørList: Aktør[]): AddAktørListAction => {
  return {
    payload: { aktørList },
    type: AktørActionType.ADD_AKTØR_LIST,
  };
};
