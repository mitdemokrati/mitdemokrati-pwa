import { AnyAction } from 'redux';

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
export const CastUserStemmeAction = (
  afstemningId: number,
  typeId: StemmeType
): CastUserStemmeActionType => ({
  payload: { afstemningId, typeId },
  type: UserActionType.CAST_USER_STEMME,
});

export type UncastUserStemmeActionType = UserAction & {
  payload: { afstemningId: number };
};
export const UncastUserStemmeAction = (
  afstemningId: number
): UncastUserStemmeActionType => ({
  payload: { afstemningId },
  type: UserActionType.UNCAST_USER_STEMME,
});
