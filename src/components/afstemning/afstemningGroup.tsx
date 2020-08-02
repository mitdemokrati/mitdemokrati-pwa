import React from 'react';

import { parseDateToLocale } from '../../utility/date';

import './afstemningGroup.less';

type AfstemningGroupProps = {
  groupHeader: string;
};
export const AfstemningGroup = ({ groupHeader }: AfstemningGroupProps) => {
  const dateHeader = parseDateToLocale(groupHeader);

  return <p className="afstemning-list--group-header">{dateHeader}</p>;
};
