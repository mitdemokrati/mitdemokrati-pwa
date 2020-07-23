import { IApplicationState } from '../store';

export const selectAfstemning = (state: IApplicationState) => state?.afstemning;

export const selectAfstemningMap = (state: IApplicationState) =>
  selectAfstemning(state)?.afstemningMap;
