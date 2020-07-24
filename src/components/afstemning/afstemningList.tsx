import React from 'react';
import { useSelector } from 'react-redux';

import { selectAfstemningList } from '../../ducks/afstemning/afstemningSelectors';

import { Afstemning } from './afstemning';

import './afstemningList.less';

export const AfstemningList = () => {
  const afstemningList = useSelector(selectAfstemningList);

  return (
    <section className="afstemning-list">
      {afstemningList.map((afstemning) => (
        <Afstemning key={afstemning.id} afstemning={afstemning} />
      ))}
    </section>
  );
};
