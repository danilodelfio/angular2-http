import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl:'./app/users/user-single/user-single.component.html'
})

export class UserSingleComponent implements OnInit  {
    user : User;
    constructor(
        private route: ActivatedRoute, 
        private service: UserService,
        private router: Router) { }

    ngOnInit() { 
        let id = this.route.snapshot.params['id'];
        this.service.getUser(id)
        .subscribe(user => this.user = user);
    }

    /**
     * Delete User
     */
    deleteUser() {
        this.service.deleteUser(this.user.id)
            .subscribe(data => {
                console.log('User was deleted');
                // routing to user list
                this.router.navigate(['/users']);
            })
    }
}