import {Component, inject} from '@angular/core';
import { API_URL, ExternalClientToken } from './ssr.providers';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    Home component.
    API Url: {{apiUrl}}

    Go to /error
  `
})
export class HomeComponent {
  readonly apiUrl = inject(API_URL, {optional: true});

  constructor() {
    console.log("server api url", this.apiUrl)

    console.log(inject(ExternalClientToken, {optional: true}));
  }
}
