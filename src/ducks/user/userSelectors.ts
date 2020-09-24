import { UserState } from './userReducer';
import { IApplicationState } from '../store/store';

export const selectUserState = (state: IApplicationState): UserState =>
  state?.user;

export const selectUserStemmeMap = (
  state: IApplicationState
): UserState['userStemmeMap'] =>
  selectUserState(state)?.userStemmeMap || new Map();
