import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// if (environment.production && isDevMode()) {
//   enableProdMode();
// }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
