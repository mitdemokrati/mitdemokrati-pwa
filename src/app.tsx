import React from 'react';
import { Provider } from 'react-redux';

import { MainLayout } from './layouts/main/mainLayout';
import { AfstemningList } from './components/afstemning/afstemningList';

import { reduxStore } from './ducks/store';
import { getNewestAfstemningList } from './ducks/afstemning/afstemningActions';

// Async load initial data
getNewestAfstemningList(20)(reduxStore.dispatch, reduxStore.getState, {});

export const MitDemokratiApp = () => (
  <Provider store={reduxStore}>
    <MainLayout>
      <AfstemningList />
    </MainLayout>
  </Provider>
);
