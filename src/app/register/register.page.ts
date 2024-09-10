import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';
  confirm_pass: string = '';
  warningVisible: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  register() {
    if (this.mdl_pass === this.confirm_pass) {
      if (this.userService.register(this.mdl_user, this.mdl_pass)) {
        this.router.navigate(["login"]);

        this.mdl_pass = '';
        this.mdl_user = '';
        this.confirm_pass = '';

      } else {
        this.warningVisible = true;
      }
    } else {
      this.warningVisible = true;
    }
  }
}
