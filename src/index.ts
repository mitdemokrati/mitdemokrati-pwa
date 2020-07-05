import { fetchLatestAfstemning } from './services/afstemningService';
import { MainLayout } from './layouts/main/mainLayout';
import { setupAxios } from './utility/setupAxios';

import { AfstemningList } from './components/afstemning/afstemningList';

setupAxios();

const reactDomPromise = import('react-dom');
const getAfstemningPromise = fetchLatestAfstemning();

const renderTarget = document.querySelector('.mitdemokrati-pwa');
if (!renderTarget) {
  throw Error('MitDemokrati: No render target for app');
}

Promise.all([reactDomPromise, getAfstemningPromise]).then(
  ([{ render }, afstemning]) => {
    if (!afstemning) {
      renderTarget!.innerHTML = 'No data';
      return;
    }

    const afstemningListComponent = AfstemningList({
      afstemningList: [afstemning],
    });

    const mainLayout = MainLayout({ children: afstemningListComponent });

    render(mainLayout, renderTarget);
  }
);
