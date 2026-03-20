import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


export interface Mensaje {
  texto: string;
  fecha: Date;
}

export interface Usuario {
  id: number;
  avatar: string;
  nombre: string;
  estado: 'online' | 'offline' | 'última vez visto';
  mensajes: Mensaje[]; // Aquí guardamos los chats del usuario
}



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe], // ¡Importante para que funcione el form!
  templateUrl: './form.component.html'
})
export class FormComponent {
  usuarioForm: FormGroup;
  
  // Usamos una Signal para guardar la lista de usuarios (Reactivo y moderno)
  usuarios = signal<Usuario[]>([]);

  constructor(private fb: FormBuilder) {
    // Definimos el formulario con validaciones básicas
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      avatar: ['', Validators.required],
      estado: ['online']
    });
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = {
        id: Date.now(), // ID único temporal
        ...this.usuarioForm.value,
        mensajes: [] // Arranca sin mensajes
      };

      // Actualizamos la lista de usuarios
      this.usuarios.update(prev => [...prev, nuevoUsuario]);
      this.usuarioForm.reset({ estado: 'online' }); // Limpiamos el form
    }
  }

  enviarMensaje(usuarioId: number, texto: string) {
    if (!texto) return;

    this.usuarios.update(listado => 
      listado.map(u => {
        if (u.id === usuarioId) {
          return { ...u, mensajes: [...u.mensajes, { texto, fecha: new Date() }] };
        }
        return u;
      })
    );
  }
}