import {inject, makeStateKey, PLATFORM_ID, type Provider, TransferState} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {REQUEST_CONTEXT} from '@angular/ssr/tokens';

const API_URL = makeStateKey<string>('api_url');

export function injectApiUrl() {
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);
  if (isPlatformServer(platformId)) {
    const ctx = inject(REQUEST_CONTEXT, {optional: true}) as { apiUrl: string };
    if (ctx) {
      console.warn("REQ CONTEXT -> ", ctx);
      transferState.set(API_URL, ctx.apiUrl);
    } else {
      console.error("REQ CONTEXT ->", ctx);
    }
  }
  return transferState.get(API_URL, null);
}

export class ExternalClient {
  constructor(baseUrl: string) {
    console.warn("Create external client with base url -> ", baseUrl ?? null);
  }
}

export function provideExternalClient(): Provider {
  return {
    provide: ExternalClient,
    useFactory: () => {
      const url = injectApiUrl();
      return new ExternalClient(url ?? '')
    }
  }
}
