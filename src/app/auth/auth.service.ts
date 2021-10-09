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
  private userId : string;
  constructor(private http: HttpClient, private router: Router){}

  getUserId(){
    return this.userId;
  }

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
    this.http.post<{token: string, expiresIn:number , userId: string}>("http://localhost:3000/api/users/login", authData)
    .subscribe(response =>{
      const expiresInDuration = response.expiresIn;
      console.log(expiresInDuration);
      this.setAuthTimer(expiresInDuration);
      this.token = response.token;
      this.userId = response.userId;
      this.authForList = true;
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(this.token, expirationDate, this.userId)
      this.authStatusUpdated.next(true);
      this.router.navigate(['/']);
    })
  }

  LogOut(){
    this.authForList = false;
    this.token = null;
    this.authStatusUpdated.next(false);
    this.clearAuthData();
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate : Date, userId: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", this.userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || ! expirationDate){
      return ;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private setAuthTimer(expiresInDuration : number){
    console.log("set timer: " + expiresInDuration)
    this.tokenTimer = setTimeout(()=>{
      this.LogOut();
    }, expiresInDuration * 1000 )
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInfo.token;
      this.authForList  = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusUpdated.next(true);
    }
  }
}
