import { render } from 'react-dom';

import { setupAxios } from './utility/setupAxios';
import { getNewestAfstemningList } from './logic/afstemning';

import { AfstemningList } from './components/afstemning/afstemningList';

const renderTarget = document.querySelector('#pwa');

setupAxios();

getNewestAfstemningList(3).then((afstemningList) => {
  if (!afstemningList) {
    renderTarget!.innerHTML = 'No data';
    return;
  }

  const afstemningListComponent = AfstemningList({ afstemningList });

  render(afstemningListComponent, renderTarget);
});
