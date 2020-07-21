const asyncResources = Promise.all([
  import('react-dom'),
  import('./utility/setupAxios'),
  import('./app'),
]);

const renderTarget = document.querySelector('.mitdemokrati-pwa');
if (!renderTarget) {
  throw Error('MitDemokrati: No render target for application.');
}

asyncResources.then(([{ render }, { setupAxios }, { MitDemokratiApp }]) => {
  setupAxios();
  render(MitDemokratiApp(), renderTarget);
});
