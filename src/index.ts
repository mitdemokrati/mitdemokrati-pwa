import { MainLayout } from './layouts/main/mainLayout';
import { setupAxios } from './utility/setupAxios';
import { getNewestAfstemningList } from './logic/afstemning';

import { AfstemningList } from './components/afstemning/afstemningList';

const reactDomPromise = import('react-dom');

setupAxios();

const getAfstemningPromise = getNewestAfstemningList(1);

const renderTarget = document.querySelector('.mitdemokrati-pwa');

if (!renderTarget) {
  throw Error('MitDemokrati: No render target for app');
}

Promise.all([reactDomPromise, getAfstemningPromise]).then(
  ([{ render }, afstemningList]) => {
    if (!afstemningList) {
      renderTarget!.innerHTML = 'No data';
      return;
    }

    const afstemningListComponent = AfstemningList({ afstemningList });
    const mainLayout = MainLayout({ children: afstemningListComponent });

    render(mainLayout, renderTarget);
  }
);
