import {Routes} from '@angular/router';
import {ErrorRouteComponent} from './error-route.component';
import {HomeComponent} from './home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'error', component: ErrorRouteComponent}
];
