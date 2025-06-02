import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadComponent: () => import('./components/users/users.component').then((m) => m.UsersComponent),
  },
];
