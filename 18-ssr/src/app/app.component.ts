import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {API_URL} from './ssr.providers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    {{ apiUrl }}

    <router-outlet/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly apiUrl = inject(API_URL, {optional: true});

  constructor() {
    const apiUrl = inject(API_URL, {optional: true});
    console.log("server api url", apiUrl)
  }
}
