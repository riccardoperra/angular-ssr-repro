import {Component, inject} from '@angular/core';
import {SSR_ONLY_UPDATE_STATUS_HANDLER} from './ssr.providers';

@Component({
  selector: 'error-route',
  standalone: true,
  template: `Error route`
})
export class ErrorRouteComponent {
  readonly updateStatus = inject(SSR_ONLY_UPDATE_STATUS_HANDLER, {optional: true})

  constructor() {
    setTimeout(() => {
      console.log("set timeout", this.updateStatus);
      // Imagine an http call
      if (true && this.updateStatus) {
        this.updateStatus(400)
      }
    }, 1000)
  }
}
