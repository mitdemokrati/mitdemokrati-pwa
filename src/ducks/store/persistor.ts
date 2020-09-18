import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { get as getItem, set as setItem, del as removeItem } from 'idb-keyval';

import { getMapTransformer } from './transformers/mapTransformer';

const afstemningTransformer = getMapTransformer(['afstemningMap'])({
  whitelist: ['afstemning'],
});
const aktørTransformer = getMapTransformer(['aktørMap'])({
  whitelist: ['aktør'],
});
const userTransform = getMapTransformer(['userStemmeMap'])({
  whitelist: ['user'],
});

const rootPersistConfig = {
  key: 'mitdemokrati',
  storage: { getItem, setItem, removeItem },
  transforms: [afstemningTransformer, aktørTransformer, userTransform],
};

export const persistRootReducer = (rootReducer: Reducer) =>
  persistReducer(rootPersistConfig, rootReducer);
