import React from 'react';

import './loading.less';

type LoadingProps = {
  text?: string;
};
export const Loading = ({ text = 'Indlæser' }: LoadingProps) => (
  <div className="loading-component">
    <p>{text}</p>
    <div className="loading" />
  </div>
);
