import {ApplicationConfig, inject, makeStateKey, PLATFORM_ID, provideZoneChangeDetection, TransferState} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {API_URL, provideExternalClient} from './ssr.providers';
import { isPlatformServer } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(),
    provideExternalClient(),

    {
      provide: API_URL,
      useFactory: () => {
        const platform = inject(PLATFORM_ID);
        const ts = inject(TransferState);
        const key = makeStateKey<string>('apiUrl');
        if (isPlatformServer(platform)) {
          ts.set(key, inject(API_URL, {skipSelf: true}))
        }
        return ts.get(key, '');
      }
    }
  ]
};
