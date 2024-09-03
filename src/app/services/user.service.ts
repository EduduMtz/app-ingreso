import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<{ usuario: string, password: string }> = [
    { usuario: 'admin', password: 'admin' }
  ];
  
  private currentUser: { usuario: string, password: string } | null = null;

  constructor() {
    // Simulamos que el usuario 'admin' está actualmente autenticado.
    this.currentUser = this.users.find(user => user.usuario === 'admin') || null;
  }

  // Verificar si la contraseña actual ingresada es correcta
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
      return true; // Simulación de éxito
    }
    return false;
  }

  // Método para autenticar al usuario durante el login
  login(usuario: string, password: string): boolean {
    const user = this.users.find(user => user.usuario === usuario && user.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  // Método para registrar un nuevo usuario
  register(usuario: string, password: string): boolean {
    if (!this.users.some(user => user.usuario === usuario)) {
      this.users.push({ usuario, password });
      return true;
    }
    return false;
  }

  // Método para cerrar sesión
  logout(): void {
    this.currentUser = null;
  }
}
