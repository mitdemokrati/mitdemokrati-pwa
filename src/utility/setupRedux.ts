import { Store } from 'redux';
import { INITIAL_AFSTEMNING_DISPLAY_COUNT } from '../config';
import { getNewestAfstemningList } from '../ducks/afstemning/afstemningThunks';

export const populateStore = (store: Store) => {
  // Load initial display data via async thunk
  getNewestAfstemningList(INITIAL_AFSTEMNING_DISPLAY_COUNT)(
    store.dispatch,
    store.getState,
    {}
  );

  return store;
};
