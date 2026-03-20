import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../models/model';

@Component({
  selector: 'app-nuevo-chat',
  standalone: true,
  imports: [ReactiveFormsModule], // ReactiveFormsModule obligatorio
  templateUrl: './nuevo-chat.component.html'
})
export class NuevoChatComponent {
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  private router = inject(Router);

  // Formulario Reactivo con validaciones básicas
  formNuevoChat: FormGroup;

  constructor() {
    this.formNuevoChat = this.fb.group({
      nombre: ['', Validators.required],
      avatar: ['https://i.pravatar.cc/150', Validators.required], // URL por defecto
      estado: ['online', Validators.required] // online/offline/custom
    });
  }

  crear() {
    if (this.formNuevoChat.valid) {
      const nuevoUsuario: Usuario = {
        id: Date.now().toString(), // Generamos ID único temporal
        ...this.formNuevoChat.value,
        mensajes: [] // Arranca sin mensajes
      };

      // Agregamos al servicio
      this.chatService.agregarChat(nuevoUsuario);
      
      // Redirigimos al chat recién creado
      this.router.navigate(['/chats', nuevoUsuario.id]);
    }
  }
}