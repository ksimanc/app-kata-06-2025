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
  {
    path: 'access-requests',
    title: 'Solicitudes de Acceso',
    loadComponent: () =>
      import('./components/access-requests/access-request.component').then((m) => m.AccessRequestComponent),
    children: [
      {
        path: '',
        title: 'Solicitudes de Acceso',
        loadComponent: () =>
          import('./components/access-requests/list-requests/list-requests.component').then(
            (m) => m.ListRequestsComponent
          ),
      },
      {
        path: 'new',
        title: 'Nueva Solicitud',
        loadComponent: () =>
          import('./components/access-requests/new-request/new-request.component').then((m) => m.NewRequestComponent),
      },
    ],
  },
];
