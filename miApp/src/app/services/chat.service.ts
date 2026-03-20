import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/model';

@Injectable({ providedIn: 'root' })
export class ChatService {

  // 🔹 Señales
  private _chats = signal<Usuario[]>([]);
  chats = this._chats.asReadonly();

  private _idSeleccionado = signal<string | null>(null);
  idSeleccionado = this._idSeleccionado.asReadonly();

  // 🔹 Constructor → carga desde localStorage
  constructor() {
    this.cargarDesdeStorage();
  }

  // 🔹 Cargar datos
  private cargarDesdeStorage() {

    // Cargar chats
    const data = localStorage.getItem('chats');
    if (data) {
      this._chats.set(JSON.parse(data));
    }

    // Cargar chat seleccionado
    const seleccionado = localStorage.getItem('chatSeleccionado');
    if (seleccionado) {
      const id = JSON.parse(seleccionado);

      // validar que exista
      const existe = this._chats().some(c => c.id === id);

      if (existe) {
        this._idSeleccionado.set(id);
      }
    }
  }

  // 🔹 Guardar chats
  private guardarChats() {
    localStorage.setItem('chats', JSON.stringify(this._chats()));
  }

  // 🔹 Guardar selección
  private guardarSeleccion() {
    localStorage.setItem('chatSeleccionado', JSON.stringify(this._idSeleccionado()));
  }

  // 🔹 Agregar chat
  agregarChat(nuevoChat: Usuario) {
    this._chats.update(lista => [...lista, nuevoChat]);
    this.guardarChats();
  }

  // 🔹 Seleccionar chat
  seleccionarChat(id: string | null) {
    this._idSeleccionado.set(id);
    this.guardarSeleccion();
  }

  // 🔹 Enviar mensaje
  enviarMensaje(chatId: string, texto: string, emisor: 'usuario' | 'app') {

    this._chats.update(lista =>
      lista.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            mensajes: [
              ...c.mensajes,
              { texto, emisor, fecha: new Date() }
            ]
          };
        }
        return c;
      })
    );

    this.guardarChats();

    // 🔹 Auto-respuesta
    if (emisor === 'usuario') {
      setTimeout(() => {
        this.enviarMensaje(
          chatId,
          `¡Hola! Soy la App. Recibí tu mensaje: "${texto}"`,
          'app'
        );
      }, 1500);
    }
  }
}