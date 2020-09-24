import {
  AktørAction,
  AktørActionType,
  AddAktørListAction,
} from './aktørActions';

export type AktørState = {
  aktørMap: Map<number, Aktør>;
};

const INITIAL_STATE: AktørState = {
  aktørMap: new Map(),
};

export const aktørReducer = (
  state: AktørState = INITIAL_STATE,
  action: AktørAction
): AktørState => {
  switch (action.type) {
    case AktørActionType.ADD_AKTØR_LIST: {
      const addAktørAction = action as AddAktørListAction;

      const newAktørMap = new Map(state.aktørMap);

      const { aktørList } = addAktørAction.payload;

      if (!aktørList) {
        return state;
      }

      aktørList.forEach((aktør) => {
        newAktørMap.set(aktør.id, aktør);
      });

      return {
        ...state,
        aktørMap: newAktørMap,
      };
    }

    default:
      return state;
  }
};
