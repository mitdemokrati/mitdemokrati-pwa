import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { getNewestAfstemningList } from '../afstemning/afstemningThunks';

import {
  afstemningReducer,
  AfstemningState,
} from '../afstemning/afstemningReducer';
import { aktørReducer, AktørState } from '../aktør/aktørReducer';
import { userReducer, UserState } from '../user/userReducer';
import { persistRootReducer } from './persistor';

export interface IApplicationState {
  afstemning: AfstemningState;
  aktør: AktørState;
  user: UserState;
}

const composeEnhancers =
  // @ts-ignore
  window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = persistRootReducer(
  combineReducers<IApplicationState>({
    afstemning: afstemningReducer,
    aktør: aktørReducer,
    user: userReducer,
  })
);

export const getReduxStore = () => {
  const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export const populateStore = (store: Store) => {
  getNewestAfstemningList(15)(store.dispatch, store.getState, {});
};
