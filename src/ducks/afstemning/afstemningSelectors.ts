import { IApplicationState } from '../store';

export const selectAfstemningMap = (state: IApplicationState) =>
  state?.afstemning?.afstemningMap;
