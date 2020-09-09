import { Reducer } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import { TransformConfig } from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage';

import { UserState } from './user/userReducer';

type TransformedUserState = {
  userStemmeMap: [number, number][];
};

const userTransformer = (config: TransformConfig) =>
  createTransform<UserState, TransformedUserState>(
    (inbound) => {
      return {
        ...inbound,
        userStemmeMap: Array.from(inbound.userStemmeMap),
      };
    },
    (outbound) => {
      return {
        ...outbound,
        userStemmeMap: new Map(outbound.userStemmeMap),
      };
    },
    config
  );

const userTransform = userTransformer({ whitelist: ['user'] });

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [userTransform],
};

export const persistRootReducer = (rootReducer: Reducer) =>
  persistReducer(rootPersistConfig, rootReducer);
