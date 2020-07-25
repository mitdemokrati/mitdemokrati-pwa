import { getNewestAfstemningList } from '../../ducks/afstemning/afstemningThunks';

import { populateStore } from '../setupRedux';

const thunkMock = jest.fn();
const testStore = {
  dispatch: jest.fn(),
  getState: jest.fn(),
};

jest.mock('../../ducks/store');
jest.mock('../../ducks/afstemning/afstemningThunks', () => ({
  getNewestAfstemningList: jest.fn(() => thunkMock),
}));

describe('the setupRedux utility', () => {
  it('populates the redux store with initial data', () => {
    // @ts-ignore
    populateStore(testStore);

    expect(getNewestAfstemningList).toHaveBeenCalledTimes(1);
    expect(getNewestAfstemningList).toHaveBeenCalledWith(18);

    expect(thunkMock).toHaveBeenCalledTimes(1);
    expect(thunkMock).toHaveBeenCalledWith(
      testStore.dispatch,
      testStore.getState,
      {}
    );
  });
});
