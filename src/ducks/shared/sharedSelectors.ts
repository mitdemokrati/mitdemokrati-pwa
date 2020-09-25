import { SharedState } from './sharedReducer';
import { IApplicationState } from '../store/store';

export const selectShared = (state: IApplicationState): SharedState =>
  state?.shared;

export const selectInstallPrompt = (
  state: IApplicationState
): BeforeInstallPromptEvent | undefined => selectShared(state)?.installPrompt;
