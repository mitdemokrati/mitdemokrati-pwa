import { AnyAction } from 'redux';

// eslint-disable-next-line no-shadow
export enum SharedActionType {
  SET_INSTALL_PROMPT = 'mitdemokrati/shared/SET_INSTALL_PROMPT',
}

export type SharedAction = AnyAction & {
  payload: unknown;
  type: SharedActionType;
};

export type SetInstallPromptAction = SharedAction & {
  payload: {
    installPrompt: BeforeInstallPromptEvent;
  };
};

// Action Creators
export const setInstallPrompt = (
  installPrompt: BeforeInstallPromptEvent
): SetInstallPromptAction => ({
  type: SharedActionType.SET_INSTALL_PROMPT,
  payload: { installPrompt },
});
