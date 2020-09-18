import { IApplicationState } from '../store/store';

export const selectAktørState = (state: IApplicationState) => state?.aktør;

export const selectAktørMap = (state: IApplicationState) =>
  selectAktørState(state)?.aktørMap;

export const selectAktørList = (state: IApplicationState) =>
  Array.from(selectAktørMap(state)?.values() || []);
