import {
  AktoerAction,
  AktoerActionType,
  AddAktoerListAction,
} from './aktoerActions';

export type AktoerState = {
  aktoerMap: Map<number, Aktoer>;
};

const INITIAL_STATE: AktoerState = {
  aktoerMap: new Map(),
};

export const aktoerReducer = (
  state: AktoerState = INITIAL_STATE,
  action: AktoerAction
): AktoerState => {
  switch (action.type) {
    case AktoerActionType.ADD_AKTOER_LIST: {
      const addAktoerAction = action as AddAktoerListAction;

      const newAktoerMap = new Map(state?.aktoerMap ?? []);

      const { aktoerList } = addAktoerAction.payload;

      if (!aktoerList) {
        return state;
      }

      aktoerList.forEach((aktoer) => {
        newAktoerMap.set(aktoer.id, aktoer);
      });

      return {
        ...state,
        aktoerMap: newAktoerMap,
      };
    }

    default:
      return state;
  }
};
