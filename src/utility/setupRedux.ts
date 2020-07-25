import { INITIAL_AFSTEMNING_DISPLAY_COUNT } from '../config';
import { reduxStore } from '../ducks/store';
import { getNewestAfstemningList } from '../ducks/afstemning/afstemningThunks';

export const setupRedux = () => {
  // Load initial display data via async thunk
  getNewestAfstemningList(INITIAL_AFSTEMNING_DISPLAY_COUNT)(
    reduxStore.dispatch,
    reduxStore.getState,
    {}
  );

  return reduxStore;
};
