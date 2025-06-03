import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'users',
    title: 'Usuarios',
    loadComponent: () => import('./modules/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'access-requests',
    title: 'Solicitudes de Acceso',
    loadComponent: () =>
      import('./modules/access-requests/access-request.component').then((m) => m.AccessRequestComponent),
    children: [
      {
        path: '',
        title: 'Solicitudes de Acceso',
        loadComponent: () =>
          import('./modules/access-requests/list-requests/list-requests.component').then(
            (m) => m.ListRequestsComponent
          ),
      },
      {
        path: 'new',
        title: 'Nueva Solicitud',
        loadComponent: () =>
          import('./modules/access-requests/new-request/new-request.component').then((m) => m.NewRequestComponent),
      },
    ],
  },
  {
    path: 'computers',
    title: 'Computadores',
    loadComponent: () => import('./modules/computers/computers.component').then((m) => m.ComputersComponent),
    children: [
      {
        path: '',
        title: 'Computadores',
        loadComponent: () =>
          import('./modules/computers/list-computers/list-computers.component').then((m) => m.ListComputersComponent),
      },
      {
        path: 'history',
        title: 'Historial de Asignaciones',
        loadComponent: () =>
          import('./modules/computers/assign-history/assign-history.component').then((m) => m.AssignHistoryComponent),
      },
    ],
  },
];
