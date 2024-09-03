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
      this.successVisible = true;
      // Redirigir después de un breve retraso
      setTimeout(() => {
        this.router.navigate(['principal']);
      }, 2000);
    } else {
      this.warningVisible = true;
    }
  }
}
