import { IApplicationState } from '../store';

export const selectAfstemningState = (state: IApplicationState) =>
  state?.afstemning;

export const selectAfstemningMap = (state: IApplicationState) =>
  selectAfstemningState(state)?.afstemningMap;

export const selectAfstemningList = (state: IApplicationState) => [
  ...selectAfstemningMap(state).values(),
];
