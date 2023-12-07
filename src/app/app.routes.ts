import { Routes } from '@angular/router';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { ShowProgressComponent } from './pages/show-progress/show-progress.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

export const routes: Routes = [
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'progress-circle', component: ShowProgressComponent },
  { path: '', redirectTo: '/orders-list', pathMatch: 'full' },
];
