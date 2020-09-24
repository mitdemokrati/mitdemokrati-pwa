import { AnyAction } from 'redux';

// eslint-disable-next-line no-shadow
export enum UserActionType {
  CAST_USER_STEMME = 'mitdemokrati_pwa/user/CAST_USER_STEMME',
  UNCAST_USER_STEMME = 'mitdemokrati_pwa/user/UNCAST_USER_STEMME',
}

export type UserAction = AnyAction & {
  payload: unknown;
  type: UserActionType;
};

export type CastUserStemmeActionType = UserAction & {
  payload: { afstemningId: number; typeId: StemmeType };
};

export type UncastUserStemmeActionType = UserAction & {
  payload: { afstemningId: number };
};

// Action Creators
export const CastUserStemmeAction = (
  afstemningId: number,
  typeId: StemmeType
): CastUserStemmeActionType => ({
  payload: { afstemningId, typeId },
  type: UserActionType.CAST_USER_STEMME,
});

export const UncastUserStemmeAction = (
  afstemningId: number
): UncastUserStemmeActionType => ({
  payload: { afstemningId },
  type: UserActionType.UNCAST_USER_STEMME,
});
