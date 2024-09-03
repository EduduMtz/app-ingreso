import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';
  warningVisible: boolean = false;
  loadingVisible: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  login() {
    this.warningVisible = false;
    this.loadingVisible = true;

    setTimeout(() => {
      if(this.userService.login(this.mdl_user, this.mdl_pass)) {
        // NAVEGACION CON PARAMETROS
        let extras: NavigationExtras = {
          state:{
            "usuario": this.mdl_user,
            "token": "Inicio exitoso."
          }
        }
        this.router.navigate(["principal"], extras);
      } else {
        this.warningVisible = true;
      }

      this.loadingVisible = false;
    }, 2000);
  }

  registro(){
    this.router.navigate(["register"]);
  }
}
