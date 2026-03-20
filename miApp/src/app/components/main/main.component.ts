  import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
  
export class MainComponent {
  // Inyectamos el servicio
  chatService = inject(ChatService);
  
  // Lista de chats del servicio (usamos el get() de la signal)
  chats = this.chatService.chats;
  
  // ID seleccionado para el responsive
  idSeleccionado = this.chatService.idSeleccionado;

  // Función para cerrar el chat en móvil
  deseleccionarChat() {
    this.chatService.seleccionarChat(null);
  }
}
  
  



