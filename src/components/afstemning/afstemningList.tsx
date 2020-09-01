import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GroupedVirtuoso } from 'react-virtuoso';

import { groupBy } from '../../utility/misc';
import { selectAfstemningList } from '../../ducks/afstemning/afstemningSelectors';
import { getPreviousAfstemningList } from '../../ducks/afstemning/afstemningThunks';

import { Loading } from '../loading/loading';
import { AfstemningGroup } from './afstemningGroup';
import { Afstemning } from './afstemning';

import './afstemningList.less';

const LOAD_MORE_AFSTEMNING_COUNT = 15;

export const AfstemningList = () => {
  const afstemningList = useSelector(selectAfstemningList);
  const dispatch = useDispatch();

  const afstemningGroups = groupBy(afstemningList, 'dato');

  const groupSizeList = Array.from(afstemningGroups.entries()).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([group, list]) => list.length
  );

  const getAfstemningRow = (index: number) => {
    const afstemning = afstemningList[index];

    return <Afstemning key={afstemning.id} afstemning={afstemning} />;
  };

  const getGroupHeader = (index: number) => {
    return (
      <AfstemningGroup
        groupHeader={Array.from(afstemningGroups.keys())[index]}
      />
    );
  };

  const lastAfstemning = afstemningList.slice(-1)[0];

  const loadMoreAfstemning = () =>
    dispatch(
      getPreviousAfstemningList(lastAfstemning, LOAD_MORE_AFSTEMNING_COUNT)
    );

  return (
    <section className="afstemning-list">
      <GroupedVirtuoso
        endReached={loadMoreAfstemning}
        footer={() => <Loading text="Henter afstemninger" />}
        item={getAfstemningRow}
        group={getGroupHeader}
        groupCounts={groupSizeList}
        overscan={300}
        style={{ height: 'calc(100vh - 48px)', width: '100%' }}
      />
    </section>
  );
};
