import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  user  : String = '';
  pass  : String = '';
  msj   : String = '';

  constructor(private router : Router) { }

  ngOnInit() {

    // RESCATAMOS LOS PARAMETROS DE NAVEGACION
    let extras = this.router.getCurrentNavigation()?.extras;

    if(extras?.state){
      this.user = extras.state["usuario"];
      this.pass = extras.state["password"];
      this.msj = extras.state["token"];
    }
    
    console.log('usuario  :' + this.user);
    console.log('password :' + this.pass);
    console.log('token  :' + this.msj);

  }

  cambioPass(){
    this.router.navigate(["change-password"]);
  }

  logout() {
    // Aquí puedes eliminar cualquier dato de sesión o credenciales guardadas
    // Por ejemplo, si estás usando LocalStorage:
    localStorage.removeItem('user');

    // Redirigir al usuario de vuelta a la página de login
    this.router.navigate(['login']);
  }

}
