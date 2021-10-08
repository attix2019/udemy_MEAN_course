import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class AuthService{
  private authForList = false;
  private token : string;
  private authStatusUpdated  = new Subject<boolean>();
  private tokenTimer : any;
  constructor(private http: HttpClient, private router: Router){}

  getAuthStatusForList(){
    return this.authForList;
  }

  getAuthStatusListener(){
    return this.authStatusUpdated.asObservable();
  }

  getToken(){
    return this.token;
  }

  createUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/users/signup", authData)
    .subscribe(response=>{
      console.log(response);
      this.router.navigate(['/']);
    })
  }

  loginUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn:number}>("http://localhost:3000/api/users/login", authData)
    .subscribe(response =>{
      const expiresInDuration = response.expiresIn;
      console.log(expiresInDuration);
      this.tokenTimer = setTimeout(()=>{
        this.LogOut();
      }, expiresInDuration )
      this.token = response.token;
      this.authForList = true;
      this.authStatusUpdated.next(true);
      this.router.navigate(['/']);
    })
  }

  LogOut(){
    this.authForList = false;
    this.token = null;
    this.authStatusUpdated.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

}
