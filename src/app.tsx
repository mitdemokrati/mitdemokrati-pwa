import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { getReduxStore, populateStore } from './ducks/store/store';

import { AfstemningList } from './components/afstemning/afstemningList';

export const MitDemokratiApp = (): JSX.Element => {
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
