import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';

import { selectAfstemningList } from '../../ducks/afstemning/afstemningSelectors';
import { getPreviousAfstemningList } from '../../ducks/afstemning/afstemningThunks';

import { Loading } from '../loading/loading';
import { Afstemning } from './afstemning';

import './afstemningList.less';

const LOAD_MORE_AFSTEMNING_COUNT = 15;

export const AfstemningList = () => {
  const afstemningList = useSelector(selectAfstemningList);
  const dispatch = useDispatch();

  const getAfstemningRow = (index: number) => {
    const afstemning = afstemningList[index];

    return <Afstemning key={afstemning.id} afstemning={afstemning} />;
  };

  const lastAfstemning = afstemningList.slice(-1)[0];

  const loadMoreAfstemning = () =>
    dispatch(
      getPreviousAfstemningList(lastAfstemning, LOAD_MORE_AFSTEMNING_COUNT)
    );

  return (
    <section className="afstemning-list">
      <Virtuoso
        endReached={loadMoreAfstemning}
        footer={() => <Loading text="Henter afstemninger" />}
        item={getAfstemningRow}
        overscan={300}
        style={{ width: '100%', height: '89vh' }}
        totalCount={afstemningList.length}
      />
    </section>
  );
};
