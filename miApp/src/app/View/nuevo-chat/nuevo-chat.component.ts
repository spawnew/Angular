import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../models/model';

@Component({
  selector: 'app-nuevo-chat',
  standalone: true,
  imports: [ReactiveFormsModule], // ReactiveFormsModule obligatorio
  templateUrl: './nuevo-chat.component.html',
   styleUrls: ['./nuevo-chat.component.css']
})
export class NuevoChatComponent {
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  private router = inject(Router);

 
  formNuevoChat: FormGroup;

  constructor() {
    this.formNuevoChat = this.fb.group({
      nombre: ['', Validators.required],
      avatar: ['https://i.pravatar.cc/150', Validators.required], 
      estado: ['online', Validators.required] 
    });
  }

  crear() {
    if (this.formNuevoChat.valid) {
      const nuevoUsuario: Usuario = {
        id: Date.now().toString(), 
        ...this.formNuevoChat.value,
        mensajes: [] 
      };

     
      this.chatService.agregarChat(nuevoUsuario);
      
      this.router.navigate(['/chats', nuevoUsuario.id]);
    }
  }
}