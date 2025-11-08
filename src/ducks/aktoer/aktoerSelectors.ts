import { IApplicationState } from '../store/store';
import { AktoerState } from './aktoerReducer';

export const selectAktoerState = (state: IApplicationState): AktoerState =>
  state?.aktoer;

export const selectAktoerMap = (
  state: IApplicationState
): AktoerState['aktoerMap'] => selectAktoerState(state)?.aktoerMap;

export const selectAktoerList = (state: IApplicationState): Aktoer[] =>
  Array.from(selectAktoerMap(state)?.values() || []);
