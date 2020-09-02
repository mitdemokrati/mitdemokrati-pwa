import React from 'react';
import { Provider } from 'react-redux';

import { getReduxStore } from './ducks/store';
import { populateStore } from './utility/setupRedux';

import { AfstemningList } from './components/afstemning/afstemningList';
import { ResetButton } from './components/button/resetButton';

export const MitDemokratiApp = () => {
  const store = getReduxStore();
  populateStore(store);

  return (
    <Provider store={store}>
      <ResetButton />
      <AfstemningList />
    </Provider>
  );
};
