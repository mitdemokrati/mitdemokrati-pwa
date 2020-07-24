import { IApplicationState } from '../store';

export const selectAktørState = (state: IApplicationState) => state?.aktør;

export const selectAktørMap = (state: IApplicationState) =>
  selectAktørState(state)?.aktørMap;

export const selectAktørList = (state: IApplicationState) => [
  ...selectAktørMap(state).values(),
];
