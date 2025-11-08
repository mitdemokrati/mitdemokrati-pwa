import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from 'redux';
import { Persistor, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { getNewestAfstemningList } from '../afstemning/afstemningThunks';
import { setInstallPrompt } from '../shared/sharedActions';
import {
  afstemningReducer,
  AfstemningState,
} from '../afstemning/afstemningReducer';
import { aktoerReducer, AktoerState } from '../aktoer/aktoerReducer';
import { sharedReducer, SharedState } from '../shared/sharedReducer';
import { userReducer, UserState } from '../user/userReducer';
import { persistRootReducer } from './persistor';

export interface IApplicationState {
  afstemning: AfstemningState;
  aktoer: AktoerState;
  shared: SharedState;
  user: UserState;
}

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const combinedReducers = persistRootReducer(
  combineReducers<IApplicationState>({
    afstemning: afstemningReducer,
    aktoer: aktoerReducer,
    shared: sharedReducer,
    user: userReducer,
  })
);

export const getReduxStore = (): {
  store: Store<unknown, AnyAction>;
  persistor: Persistor;
} => {
  const store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export const populateStore = (store: Store): void => {
  getNewestAfstemningList(15)(store.dispatch, store.getState, {});

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    store.dispatch(setInstallPrompt(event as BeforeInstallPromptEvent));
  });
};
