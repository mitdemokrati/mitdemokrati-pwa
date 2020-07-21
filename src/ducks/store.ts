import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
  afstemningReducer,
  AfstemningState,
} from './afstemning/afstemningReducer';

export interface IApplicationState {
  afstemning: AfstemningState;
}

const combinedReducers = combineReducers<IApplicationState>({
  afstemning: afstemningReducer,
});

export const reduxStore = createStore(combinedReducers, applyMiddleware(thunk));
