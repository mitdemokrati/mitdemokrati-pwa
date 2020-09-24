import {
  UserAction,
  UserActionType,
  CastUserStemmeActionType,
  UncastUserStemmeActionType,
} from './userActions';

export type UserState = {
  userStemmeMap: Map<number, number>;
};

const INITIAL_USER_STATE: UserState = {
  userStemmeMap: new Map(),
};

export const userReducer = (
  state: UserState = INITIAL_USER_STATE,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionType.CAST_USER_STEMME: {
      const userAction = action as CastUserStemmeActionType;

      const { afstemningId, typeId } = userAction.payload;

      const newUserStemmeMap = new Map(state.userStemmeMap);

      newUserStemmeMap.set(afstemningId, typeId);

      return {
        ...state,
        userStemmeMap: newUserStemmeMap,
      };
    }

    case UserActionType.UNCAST_USER_STEMME: {
      const userAction = action as UncastUserStemmeActionType;

      const { afstemningId } = userAction.payload;

      const newUserStemmeMap = new Map(state.userStemmeMap);

      newUserStemmeMap.delete(afstemningId);

      return {
        ...state,
        userStemmeMap: newUserStemmeMap,
      };
    }

    default:
      return state;
  }
};
