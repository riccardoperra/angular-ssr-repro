import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {API_URL} from './ssr.providers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
}
