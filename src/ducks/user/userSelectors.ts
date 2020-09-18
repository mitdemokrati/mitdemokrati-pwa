import { IApplicationState } from '../store/store';

export const selectUserState = (state: IApplicationState) => state?.user;

export const selectUserStemmeMap = (state: IApplicationState) =>
  selectUserState(state)?.userStemmeMap || new Map();
