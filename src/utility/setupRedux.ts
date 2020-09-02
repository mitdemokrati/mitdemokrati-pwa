import { Store } from 'redux';

import { INITIAL_AFSTEMNING_DISPLAY_COUNT } from '../config';
import { getNewestAfstemningList } from '../ducks/afstemning/afstemningThunks';
import { populateAktørList } from '../ducks/aktør/aktørThunks';

export const populateStore = (store: Store) => {
  const { dispatch, getState } = store;

  // Load initial display data via async thunk
  getNewestAfstemningList(INITIAL_AFSTEMNING_DISPLAY_COUNT)(
    dispatch,
    getState,
    {}
  );

  populateAktørList()(dispatch, getState, {});

  return store;
};
