import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { getReduxStore } from './ducks/store';
import { populateStore } from './utility/setupRedux';

import { AfstemningList } from './components/afstemning/afstemningList';

export const MitDemokratiApp = () => {
  const { persistor, store } = getReduxStore();
  populateStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AfstemningList />
      </PersistGate>
    </Provider>
  );
};
