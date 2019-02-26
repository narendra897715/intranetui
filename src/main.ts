import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// let ui_env : string = 'development';
// if(ui_env === 'development'){
//   process.env.BASE_URL = 'http://localhost:3000/';
//   process.env.OTHER_APPS = 'http://localhost:8080/';
//   process.env.SOCKET_BASE_URL = 'http://localhost:3000';
// }
// if(ui_env === 'production'){
//   process.env.BASE_URL = 'http://172.16.10.51:1234/';
//   process.env.OTHER_APPS = 'http://172.16.10.51:8088/';
//   process.env.SOCKET_BASE_URL = 'http://172.16.10.51:1234';
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
