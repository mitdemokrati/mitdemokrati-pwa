import { IApplicationState } from '../store';

export const selectUserState = (state: IApplicationState) => state?.user;

export const selectUserStemmeMap = (state: IApplicationState) =>
  selectUserState(state)?.userStemmeMap;
