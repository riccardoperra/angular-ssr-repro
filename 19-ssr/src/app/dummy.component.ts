import {Component, effect, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {REQUEST_CONTEXT} from '@angular/ssr/tokens';

@Component({
  standalone: true,
  selector: 'app-dummy-comp',
  template: `DummyComponent works`,
})
export class DummyComponent {
  readonly http = inject(HttpClient);

  readonly todo = toSignal(
    this.http.get('https://jsonplaceholder.typicode.com/todos')
  );

  readonly context = inject<{
    updateStatus: (code: number) => void
  }>(REQUEST_CONTEXT, {optional: true});

  constructor() {
    effect(() => {
      void this.todo();
      this.context?.updateStatus?.(418);
    });
  }
}
