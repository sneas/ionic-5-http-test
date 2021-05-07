import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Plugins, StatusBarStyle } from '@capacitor/core';

const { StatusBar } = Plugins;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

StatusBar.setOverlaysWebView({
  overlay: true,
});

window.addEventListener('ionModalWillDismiss', async (e) => {
  document.body.style.backgroundColor = '#fff';
  await StatusBar.setStyle({ style: StatusBarStyle.Light });
});
window.addEventListener('ionModalWillPresent', async (e) => {
  document.body.style.backgroundColor = '#333';
  await StatusBar.setStyle({ style: StatusBarStyle.Dark });
});
