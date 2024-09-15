import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_correo: string = '';
  mdl_user: string = '';
  mdl_pass: string = '';
  confirm_pass: string = '';
  warningVisible: boolean = false;
  errorCorreo: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  togglePasswordVisibility(){
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
      } else {
        this.passwordType = 'password';
        this.passwordIcon = 'eye-off';
        }
  }

  verifyEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  register() {

    if (!this.verifyEmail(this.mdl_correo)) {
      this.errorCorreo = true;
      console.log("Correo electrónico no válido");
      setTimeout(() => {
        this.errorCorreo = false;
      }, 2000);
      return;
    }

    if (this.mdl_pass === this.confirm_pass) {
      if (this.userService.register(this.mdl_user, this.mdl_pass, this.mdl_correo, this.mdl_nombre, this.mdl_apellido)) {
        this.router.navigate(["login"]);

        this.mdl_pass = '';
        this.mdl_user = '';
        this.mdl_nombre = '';
        this.mdl_apellido = '';
        this.mdl_correo = '';
        this.confirm_pass = '';

      } else {
        this.warningVisible = true;
      }
    } else {
      this.warningVisible = true;
    }
  }
}
