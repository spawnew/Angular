import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/model';

@Injectable({ providedIn: 'root' })
export class ChatService {

 
  private _chats = signal<Usuario[]>([]);
  chats = this._chats.asReadonly();

  private _idSeleccionado = signal<string | null>(null);
  idSeleccionado = this._idSeleccionado.asReadonly();

 
  constructor() {
    this.cargarDesdeStorage();
  }

  
  private cargarDesdeStorage() {

   
    const data = localStorage.getItem('chats');
    if (data) {
      this._chats.set(JSON.parse(data));
    }


    const seleccionado = localStorage.getItem('chatSeleccionado');
    if (seleccionado) {
      const id = JSON.parse(seleccionado);

      
      const existe = this._chats().some(c => c.id === id);

      if (existe) {
        this._idSeleccionado.set(id);
      }
    }
  }

  
  private guardarChats() {
    localStorage.setItem('chats', JSON.stringify(this._chats()));
  }

 
  private guardarSeleccion() {
    localStorage.setItem('chatSeleccionado', JSON.stringify(this._idSeleccionado()));
  }


  agregarChat(nuevoChat: Usuario) {
    this._chats.update(lista => [...lista, nuevoChat]);
    this.guardarChats();
  }

 
  seleccionarChat(id: string | null) {
    this._idSeleccionado.set(id);
    this.guardarSeleccion();
  }


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