import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  closeOtherSessions: boolean = false;
  warningVisible: boolean = false;
  successVisible: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  changePassword() {
    this.warningVisible = false;
    this.successVisible = false;

    // Verificar que la nueva contraseña y la confirmación coinciden
    if (this.newPassword !== this.confirmNewPassword) {
      this.warningVisible = true;
      return;
    }

    // Verificar si la contraseña actual es correcta
    if (!this.userService.verifyPassword(this.currentPassword)) {
      this.warningVisible = true;
      return;
    }

    // Cambiar la contraseña
    const passwordChanged = this.userService.changePassword(this.newPassword);

    if (passwordChanged) {
      this.successVisible = true;  // Mostrar el mensaje de éxito
  
      if (this.closeOtherSessions) {
        // Mostrar mensaje de que las sesiones se están cerrando
        setTimeout(() => {
          this.router.navigate(['login']);  // Redirigir al login
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';

        }, 2000);
      } else {
        // Mostrar mensaje de éxito normal
        setTimeout(() => {
          this.router.navigate(['principal']);  // Redirigir a la página principal
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
          
        }, 2000);
      }
    } else {
      this.warningVisible = true;
    }
  }
}
