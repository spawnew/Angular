import { Component, inject, input, computed } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conversacion',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent {
  private chatService = inject(ChatService);

 
  id = input.required<string>(); 

  
  chatActual = computed(() => {
    return this.chatService.chats().find(c => c.id === this.id());
  });

  enviar(texto: string) {
    if (texto.trim()) {
      this.chatService.enviarMensaje(this.id(), texto, 'usuario');
    }
  }
}