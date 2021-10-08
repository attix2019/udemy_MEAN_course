import { AuthService } from './../auth.service';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  authService :AuthService;

  constructor(authService :AuthService){
    this.authService = authService;
  }

  onLogin(form :NgForm){
    if(form.invalid){
      return ;
    }
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
