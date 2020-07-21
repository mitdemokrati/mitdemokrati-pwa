import React from 'react';
import { useSelector } from 'react-redux';

import { selectAfstemningMap } from '../../ducks/afstemning/afstemningSelectors';

import { Afstemning } from './afstemning';

import './afstemningList.less';

export const AfstemningList = () => {
  const afstemningMap = useSelector(selectAfstemningMap);
  const afstemningList = [...afstemningMap.values()];

  return (
    <section className="afstemning-list">
      {afstemningList.map((afstemning) => (
        <Afstemning key={afstemning.id} afstemning={afstemning} />
      ))}
    </section>
  );
};
