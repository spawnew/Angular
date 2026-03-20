import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
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
  }
];