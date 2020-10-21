import 'regenerator-runtime/runtime';
import { setupAxios } from './utility/setupAxios';

import './index.less';

// Async load larger dependencies
const asyncResources = Promise.all([import('react-dom'), import('./app')]);

// Find render target
const renderTarget = document.querySelector('.mitdemokrati-pwa');
if (!renderTarget) {
  throw Error('MitDemokrati: No render target for application.');
}

// Render app when dependencies loaded
asyncResources.then(([{ render }, { MitDemokratiApp }]) => {
  setupAxios();
  render(MitDemokratiApp(), renderTarget);
});

// Register ServiceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./serviceWorker.ts');
  });
}
