import { Reducer, AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import { get as getItem, set as setItem, del as removeItem } from 'idb-keyval';

import { getMapTransformer } from './transformers/mapTransformer';

const afstemningTransformer = getMapTransformer(['afstemningMap'])({
  whitelist: ['afstemning'],
});
const aktoerTransformer = getMapTransformer(['aktoerMap'])({
  whitelist: ['aktoer'],
});
const userTransform = getMapTransformer(['userStemmeMap'])({
  whitelist: ['user'],
});

const rootPersistConfig = {
  key: 'mitdemokrati',
  storage: { getItem, setItem, removeItem },
  transforms: [afstemningTransformer, aktoerTransformer, userTransform],
};

export const persistRootReducer = (
  rootReducer: Reducer
): Reducer<unknown, AnyAction> =>
  persistReducer(rootPersistConfig, rootReducer);
