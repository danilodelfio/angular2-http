import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <div class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a routerLink="/" class="navbar-brand">My HTTP App</a>
          </div>
          <ul class="nav navbar-nav">
            <li><a routerLink="/users">Users</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li *ngIf="!isLoggedIn"><a routerLink="/login">Login</a></li>
            <li *ngIf="isLoggedIn"><a (click)="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit{
 users : User[]
  constructor ( 
    private userservice: UserService,
    private authservice: AuthService,
    private router: Router ) {

  } 

  ngOnInit () {
    // grab users
    this.userservice.getUsers().subscribe( users => this.users = users);
  }

  /**
   * Log the user out
   */
  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  /**
     * Is the user logged in?
     */
    get isLoggedIn() {
        return this.authservice.isLoggedIn();
    }

}