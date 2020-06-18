import React from 'react';

import { Afstemning } from './afstemning';

import './afstemningList.less';

type AfstemningListProps = {
  afstemningList: Afstemning[];
};

export const AfstemningList = ({ afstemningList }: AfstemningListProps) => {
  return (
    <section className="afstemning-list">
      {afstemningList.map((afstemning) => (
        <Afstemning key={afstemning.id} afstemning={afstemning} />
      ))}
    </section>
  );
};
