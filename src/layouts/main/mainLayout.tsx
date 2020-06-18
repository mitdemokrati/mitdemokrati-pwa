import React from 'react';

import './mainLayout.less';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => <>{children}</>;
