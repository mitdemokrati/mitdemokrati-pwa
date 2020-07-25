import React from 'react';
import { Provider } from 'react-redux';

import { setupRedux } from './utility/setupRedux';
import { AfstemningList } from './components/afstemning/afstemningList';

export const MitDemokratiApp = () => {
  const reduxStore = setupRedux();

  return (
    <Provider store={reduxStore}>
      <AfstemningList />
    </Provider>
  );
};
