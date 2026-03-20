import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  
 
  errorDeLogin: boolean = false;

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;

   
    if (email === 'admin@gmail.com' && password === '123456') {
      this.errorDeLogin = false;
      console.log('¡Acceso concedido!');
      this.router.navigate(['/chats']); 
    } else {
    
      this.errorDeLogin = true;
      console.log('Usuario o clave incorrectos');
    }
  }
}