import { IApplicationState } from '../store/store';
import { AktørState } from './aktørReducer';

export const selectAktørState = (state: IApplicationState): AktørState =>
  state?.aktør;

export const selectAktørMap = (
  state: IApplicationState
): AktørState['aktørMap'] => selectAktørState(state)?.aktørMap;

export const selectAktørList = (state: IApplicationState): Aktør[] =>
  Array.from(selectAktørMap(state)?.values() || []);
