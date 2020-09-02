import {
  AfstemningAction,
  AfstemningActionType,
  AddAfstemningListAction,
} from './afstemningActions';

export type AfstemningState = {
  afstemningMap: Map<number, Afstemning>;
};

const INITIAL_STATE: AfstemningState = {
  afstemningMap: new Map(),
};

export const afstemningReducer = (
  state: AfstemningState = INITIAL_STATE,
  action: AfstemningAction
) => {
  switch (action.type) {
    case AfstemningActionType.ADD_AFSTEMNING_LIST: {
      const addAfstemningListAction = action as AddAfstemningListAction;

      const { afstemningList } = addAfstemningListAction.payload;

      if (!afstemningList) {
        return state;
      }

      const newAfstemningMap = new Map(state.afstemningMap);

      afstemningList.forEach((afstemning) => {
        newAfstemningMap.set(afstemning.id, afstemning);
      });

      return {
        ...state,
        afstemningMap: newAfstemningMap,
      };
    }

    default:
      return state;
  }
};
