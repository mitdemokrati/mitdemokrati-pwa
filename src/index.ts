import { setupAxios } from './utility/setupAxios';

const asyncResources = Promise.all([import('react-dom'), import('./app')]);

const renderTarget = document.querySelector('.mitdemokrati-pwa');
if (!renderTarget) {
  throw Error('MitDemokrati: No render target for application.');
}

asyncResources.then(([{ render }, { MitDemokratiApp }]) => {
  setupAxios();
  render(MitDemokratiApp(), renderTarget);
});
