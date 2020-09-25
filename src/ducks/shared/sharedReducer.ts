import {
  SharedAction,
  SharedActionType,
  SetInstallPromptAction,
} from './sharedActions';

export type SharedState = {
  installPrompt?: BeforeInstallPromptEvent;
};

const INITIAL_SHARED_STATE: SharedState = {};

export const sharedReducer = (
  state = INITIAL_SHARED_STATE,
  action: SharedAction
): SharedState => {
  switch (action.type) {
    case SharedActionType.SET_INSTALL_PROMPT: {
      const { payload } = action as SetInstallPromptAction;

      return {
        ...state,
        installPrompt: payload.installPrompt,
      };
    }

    default:
      return state;
  }
};
