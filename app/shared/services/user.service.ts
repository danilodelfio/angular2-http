import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
        return this.http.get(this.userUrl)
            .map(res => res.json().data)
            .map(users => users.map(this.toUser))
            .catch(this.handleError);
    }
    /**
     * Get a single User
     */
    getUser(id: number): Observable<User> {
        return this.http.get(`${this.userUrl}/${id}`)
            .map(res => res.json().data)
            .map(this.toUser)
            .catch(this.handleError);
    }

    /**
     * Update user
     */
    updateUser(user): Observable<User> {
        return this.http.put(`${this.userUrl}/${user.id}`, user)
            .map(res => res.json())
            .catch(this.handleError);
    }
    /**
     * Covert user info from the API to our format
     */
    private toUser(user): User {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            username: `${user.first_name}`,
            avatar: user.avatar
        }
    }

    /**
     * Handle errors from API
     */
    private handleError(err) {
        let errMessage : string;
        if(err instanceof Response) {
            let body = err.json() || '';
            let error = body.error || JSON.stringify(body);
            errMessage = `${err.status} - ${err.statusText || ''} ${error}`
        } else {
            errMessage = err.message ? err.message : err.toString();
        }
        return Observable.throw(errMessage);
    }
}