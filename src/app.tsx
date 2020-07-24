import React from 'react';
import { Provider } from 'react-redux';

import { MainLayout } from './layouts/main/mainLayout';
import { AfstemningList } from './components/afstemning/afstemningList';

import { reduxStore } from './ducks/store';
import { getNewestAfstemningList } from './ducks/afstemning/afstemningThunks';
import { INITIAL_AFSTEMNING_DISPLAY_COUNT } from './config';

// Load initial display data via async thunk
getNewestAfstemningList(INITIAL_AFSTEMNING_DISPLAY_COUNT)(
  reduxStore.dispatch,
  reduxStore.getState,
  {}
);

export const MitDemokratiApp = () => {
  return (
    <Provider store={reduxStore}>
      <MainLayout>
        <AfstemningList />
      </MainLayout>
    </Provider>
  );
};
