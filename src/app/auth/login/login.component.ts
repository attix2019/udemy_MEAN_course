import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-post-list',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;

  onLogin(loginForm :NgForm){
    console.log(loginForm.value)
  }
}
