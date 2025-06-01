import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment';
import { enableProdMode } from '@angular/core';
import { BdbCustomLogger } from '@npm-bbta/sdk-ae-frontend-utils-logs-lib';
import { defineCustomElements } from '@npm-bbta/bbog-dig-dt-sherpa-lib/loader';

if (environment.production) {
  enableProdMode();
}

BdbCustomLogger.config({
  isProduction: environment.production,
});

defineCustomElements();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
