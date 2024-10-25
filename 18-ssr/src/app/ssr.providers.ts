import {inject, InjectionToken, type Provider} from '@angular/core';

export const SSR_ONLY_UPDATE_STATUS_HANDLER = new InjectionToken<(code: number) => void>('')

export const API_URL = new InjectionToken<string>('apiUrl');

export const ExternalClientToken = new InjectionToken<{url: string}>('external client');

export function createExternalClient(url: string) {
  return {
    url
  }
}


export function provideExternalClient(): Provider {
  return {
    provide: ExternalClientToken,
    useFactory: () => {
      const url = inject(API_URL, {optional: true});
      return createExternalClient(url ?? '');
    }
  }
}
