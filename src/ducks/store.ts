import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import {
  afstemningReducer,
  AfstemningState,
} from './afstemning/afstemningReducer';

import { aktørReducer, AktørState } from './aktør/aktørReducer';

export interface IApplicationState {
  afstemning: AfstemningState;
  aktør: AktørState;
}

const combinedReducers = combineReducers<IApplicationState>({
  afstemning: afstemningReducer,
  aktør: aktørReducer,
});

export const getReduxStore = () =>
  createStore(combinedReducers, applyMiddleware(thunk));
