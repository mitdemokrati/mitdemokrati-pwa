import { IApplicationState } from '../store/store';

export const selectAfstemningState = (state: IApplicationState) =>
  state?.afstemning;

export const selectAfstemningMap = (state: IApplicationState) =>
  selectAfstemningState(state)?.afstemningMap || new Map();

export const selectAfstemningList = (state: IApplicationState) =>
  Array.from(selectAfstemningMap(state)?.values() || []);
