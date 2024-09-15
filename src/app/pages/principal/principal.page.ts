import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  name  : String = '';
  email : String = '';
  last_name : String = '';
  user  : String = '';
  pass  : String = '';
  msj   : String = '';

  constructor(private router: Router, private userService : UserService) { }

  ngOnInit() {

    const currentUser = this.userService.getUser();

    if(currentUser){
      this.name = currentUser.nombre;
      this.email = currentUser.correo;
      this.last_name = currentUser.apellido;
      this.user = currentUser.usuario;
      this.pass = currentUser.password;
    }
    
    console.log('nombre   :' + this.name);
    console.log('apellido :' + this.last_name);
    console.log('correo   :' + this.email);
    console.log('usuario  :' + this.user);
    console.log('password :' + this.pass);
    console.log('token  :' + this.msj);

  }

  cambioPass(){
    this.router.navigate(["change-password"]);
  }

  infoUser(){
    this.router.navigate(["user-info"]);
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

}
