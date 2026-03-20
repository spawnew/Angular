import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Si la URL está vacía, ahora redirigimos al Login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Ruta del Login (La primera que se ve)
  {
    path: 'login',
    loadComponent: () => import('./View/formlogin/formlogin.component').then(m => m.LoginComponent)
  },

  // 3. Rutas de los Chats (Protegidas o secundarias al login)
  {
    path: 'chats',
    loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'nuevo',
        loadComponent: () => import('./view/nuevo-chat/nuevo-chat.component').then(m => m.NuevoChatComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./view/conversacion/conversacion.component').then(m => m.ConversacionComponent)
      }
    ]
  },

  // Opcional: Ruta "comodín" por si escriben cualquier cosa, que vuelva al login
  { path: '**', redirectTo: 'login' }
];