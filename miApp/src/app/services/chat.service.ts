import { Injectable, signal, computed } from '@angular/core';
import { Usuario, Mensaje } from '../models/model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  // Señal principal privada con todos los chats
  private _chats = signal<Usuario[]>([]);

  // Exponemos la lista como solo lectura para los componentes
  chats = this._chats.asReadonly();

  // Señal opcional para guardar cuál es el ID seleccionado (útil para el responsive)
  private _idSeleccionado = signal<string | null>(null);
  idSeleccionado = this._idSeleccionado.asReadonly();

  // Función para agregar un nuevo chat desde el formulario
  agregarChat(nuevoChat: Usuario) {
    this._chats.update(lista => [...lista, nuevoChat]);
  }

  // Función para seleccionar un chat (para el responsive y lógica)
  seleccionarChat(id: string | null) {
    this._idSeleccionado.set(id);
  }

  // Lógica para enviar mensaje y auto-respuesta
  enviarMensaje(chatId: string, texto: string, emisor: 'usuario' | 'app') {
    this._chats.update(lista =>
      lista.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            mensajes: [...c.mensajes, { texto, emisor, fecha: new Date() }]
          };
        }
        return c;
      })
    );

    // Auto-respuesta de la App si el mensaje fue del usuario
    if (emisor === 'usuario') {
      setTimeout(() => {
        this.enviarMensaje(chatId, `¡Hola! Soy la App. Recibí tu mensaje: "${texto}"`, 'app');
      }, 1500); // 1.5 segundos de retraso
    }
  }
}