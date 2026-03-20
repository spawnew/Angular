export interface Mensaje {
  emisor: 'usuario' | 'app';
  texto: string;
  fecha: Date;
}

export interface Chat {
  id: string;
  nombre: string;
  avatar: string;
  estado: string;
  mensajes: Mensaje[];
}



export interface Usuario {
  id: string; 
  nombre: string;
  avatar: string;
  estado: 'online' | 'offline' | string; 
  mensajes: Mensaje[]; 
}