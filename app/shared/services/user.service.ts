import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable() 
export class UserService {
    private userUrl : string = 'https://reqres.in/api/users';
    constructor(private http:Http) {}

    /**
     * Get all users
     */
    getUsers(): Observable<User[]> {
        return this.http.get(this.userUrl).map(res => res.json().data);
    }
}