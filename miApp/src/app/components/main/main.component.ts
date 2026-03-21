
;
import { CommonModule } from '@angular/common'; 
import { ChatService } from '../../services/chat.service';
import { Component, inject, computed } from '@angular/core'; // Agregá computed
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'; // Agregá Router

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
  
export class MainComponent {
  chatService = inject(ChatService);
  router = inject(Router); // Inyectamos el router

  chats = this.chatService.chats;
  idSeleccionado = this.chatService.idSeleccionado;

  // Nueva Signal que detecta si debe mostrarse el contenido principal
  mostrarContenido = computed(() => {
    return this.idSeleccionado() !== null || this.router.url.includes('/nuevo');
  });

  deseleccionarChat() {
    this.chatService.seleccionarChat(null);
    this.router.navigate(['/chats']); // Volvemos a la lista base
  }
}
  
  



