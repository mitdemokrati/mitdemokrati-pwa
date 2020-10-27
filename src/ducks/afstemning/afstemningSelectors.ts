import { sortAfstemning } from '../../utility/afstemning';
import { IApplicationState } from '../store/store';
import { AfstemningState } from './afstemningReducer';

export const selectAfstemningState = (
  state: IApplicationState
): AfstemningState => state?.afstemning;

export const selectAfstemningMap = (
  state: IApplicationState
): AfstemningState['afstemningMap'] =>
  selectAfstemningState(state)?.afstemningMap || new Map();

export const selectAfstemningList = (state: IApplicationState): Afstemning[] =>
  Array.from(selectAfstemningMap(state)?.values() || []).sort(sortAfstemning);
