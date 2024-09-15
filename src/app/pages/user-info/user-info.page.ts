import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  name: string = '';
  last_name: string = '';
  email: string = '';
  user: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    const currentUser = this.userService.getUser();

    if (currentUser) {
      this.name = currentUser.nombre;
      this.last_name = currentUser.apellido;
      this.email = currentUser.correo;
      this.user = currentUser.usuario;
    }
    else{
      console.log('problema al traer al usuario')
    }
    
    console.log('nombre   :' + this.name);
    console.log('apellido :' + this.last_name);
    console.log('correo   :' + this.email);
    console.log('usuario  :' + this.user);
  }
}
