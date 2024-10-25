import {Component, inject, makeStateKey, TransferState, VERSION,} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {REQUEST, REQUEST_CONTEXT} from '@angular/ssr/tokens';
import {injectApiUrl} from './providers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
      <router-outlet/>
  `,
})
export class AppComponent {
  constructor() {
    console.warn("api url in app component -> ", injectApiUrl());
  }
}
