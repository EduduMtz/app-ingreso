import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<{ usuario: string, password: string, correo: string, nombre: string, apellido: string}> = [];
  
  private currentUser: { usuario: string, password: string, correo: string, nombre: string, apellido: string } | null = null;

  constructor() {
    this.currentUser = null;
  }

  // Verificar contraseña
  verifyPassword(password: string): boolean {
    if (this.currentUser) {
      return this.currentUser.password === password;
    }
    return false;
  }

  // Cambiar la contraseña del usuario actual
  changePassword(newPassword: string): boolean {
    if (this.currentUser) {
      this.currentUser.password = newPassword;
      return true;
    }
    return false;
  }

  // Método para autenticar al usuario durante el login
  login(usuario: string, password: string): boolean {
    const normalizarUsuario = usuario.toLowerCase();
    const user = this.users.find(user => user.usuario === normalizarUsuario && user.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  // Método para registrar un nuevo usuario
  register(usuario: string, password: string, correo: string, nombre: string, apellido: string): boolean {
    const normalizarUsuario = usuario.toLowerCase();
    if (!this.users.some(user => user.usuario === normalizarUsuario)) {
      this.users.push({ usuario: normalizarUsuario, password, correo, nombre, apellido });
      return true;
    }
    return false;
  }

  getUser(){
    return this.currentUser;
  }

  // Método para cerrar sesión
  logout(): void {
    this.currentUser = null;
  }

}
