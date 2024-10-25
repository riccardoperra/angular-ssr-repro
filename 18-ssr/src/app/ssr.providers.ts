import {inject, InjectionToken, type Provider} from '@angular/core';

export const SSR_ONLY_UPDATE_STATUS_HANDLER = new InjectionToken<(code: number) => void>('')

export const API_URL = new InjectionToken<string>('');

class _ExternalClient {
  constructor(baseUrl: string) {
    console.log("Create external client with base url", baseUrl);
  }
}

const ExternalClient = new InjectionToken<_ExternalClient>('external client');

export function provideExternalClient(): Provider {
  return {
    provide: ExternalClient,
    useFactory: () => {
      const url = inject(API_URL);
      return new _ExternalClient(url)
    }
  }
}
