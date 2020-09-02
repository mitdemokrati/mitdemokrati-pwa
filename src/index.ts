import { setupAxios } from './utility/setupAxios';

import './index.less';

const asyncResources = Promise.all([import('react-dom'), import('./app')]);

const renderTarget = document.querySelector('.mitdemokrati-pwa');
if (!renderTarget) {
  throw Error('MitDemokrati: No render target for application.');
}

asyncResources.then(([{ render }, { MitDemokratiApp }]) => {
  setupAxios();
  render(MitDemokratiApp(), renderTarget);
});
