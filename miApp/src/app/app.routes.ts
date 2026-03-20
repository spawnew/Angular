import { Routes } from '@angular/router';

export const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  
  {
    path: 'login',
    loadComponent: () => import('./View/formlogin/formlogin.component').then(m => m.LoginComponent)
  },

 
  {
    path: 'chats',
    loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'nuevo',
        loadComponent: () => import('./View/nuevo-chat/nuevo-chat.component').then(m => m.NuevoChatComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./View/conversacion/conversacion.component').then(m => m.ConversacionComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];