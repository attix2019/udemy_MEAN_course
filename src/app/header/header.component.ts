import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class  Header implements OnInit, OnDestroy{
  isAuthenticated = false;
  private authStatusSub : Subscription;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getAuthStatusForList();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(result =>{
      this.isAuthenticated = result;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  onLogout(){
    this.authService.LogOut();
  }
}
