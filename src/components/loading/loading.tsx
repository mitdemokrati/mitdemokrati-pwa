import React from 'react';
import { isOnline } from '../../utility/online';

import './loading.less';

const OfflineLoading = () => (
  <div className="loading-component">
    <h3>Offline</h3>
    <p>Kan ikke hente data</p>
  </div>
);

type LoadingProps = {
  text?: string;
};
export const Loading = ({ text = 'Indlæser' }: LoadingProps) =>
  isOnline() ? (
    <div className="loading-component">
      <p>{text}</p>
      <div className="loading" />
    </div>
  ) : (
    <OfflineLoading />
  );
