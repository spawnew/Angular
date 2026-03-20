import { Component, Input, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el date pipe
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Usuario } from '../../models/model';

@Component({
  selector: 'app-conversacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ReactiveFormsModule obligatorio
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent {
  // Capturamos el :id de la URL gracias a `withComponentInputBinding()`
  @Input() id: string = '';
  
  private chatService = inject(ChatService);
  private fb = inject(FormBuilder);
  
  // Obtenemos el chat activo completo (usando computed)
  chatActivo = computed(() => this.chatService.chats().find(c => c.id === this.id) || null);
  
  // Formulario Reactivo para el mensaje
  formMensaje: FormGroup;

  constructor() {
    this.formMensaje = this.fb.group({
      texto: ['', Validators.required] // Validación de mensaje no vacío
    });
    
    // Un efecto opcional para marcar el chat seleccionado en el responsive
    effect(() => {
      if (this.id) {
        this.chatService.seleccionarChat(this.id);
      }
    });
  }

  mandar() {
    if (this.formMensaje.valid && this.chatActivo()) {
      const texto = this.formMensaje.value.texto;
      
      // Enviamos el mensaje del usuario
      this.chatService.enviarMensaje(this.id, texto, 'usuario');
      
      // Limpiamos el form
      this.formMensaje.reset();
    }
  }
}