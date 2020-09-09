import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import {
  afstemningReducer,
  AfstemningState,
} from './afstemning/afstemningReducer';

import { aktørReducer, AktørState } from './aktør/aktørReducer';

import { userReducer, UserState } from './user/userReducer';
import { persistRootReducer } from './persistor';

export interface IApplicationState {
  afstemning: AfstemningState;
  aktør: AktørState;
  user: UserState;
}

const combinedReducers = persistRootReducer(
  combineReducers<IApplicationState>({
    afstemning: afstemningReducer,
    aktør: aktørReducer,
    user: userReducer,
  })
);

export const getReduxStore = () => {
  const store = createStore(combinedReducers, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
};
