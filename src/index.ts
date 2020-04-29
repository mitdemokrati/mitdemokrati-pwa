import { setupAxios } from './utility/setupAxios';
import { getNewestAfstemningList } from './logic/afstemning';

const renderTarget = document.querySelector('#pwa');

setupAxios();

getNewestAfstemningList(3).then((afstemningList) => {
  if (!afstemningList) {
    renderTarget!.innerHTML = 'No data';
    return;
  }

  const afstemningTitleList = afstemningList.map(
    (afstemning) => afstemning.Sagstrin.Sag.titel
  );

  renderTarget!.innerHTML = afstemningTitleList
    .map((title) => `<p>${title}</p>`)
    .join('');
});
