import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'isv-users',
    templateUrl: './app/users/user.component.html'
})

export class UsersComponent implements OnInit {
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private service: UserService) { }

    ngOnInit() {
        // the user has been created
        this.service.userCreated$.subscribe( user => {
            this.successMessage = `${user.name} has been created`;
            this.clearMessages();
        })

        // the user has been deleted
        this.service.userDeleted$.subscribe( () => {
            this.successMessage = `The user has been deleted`;
            this.clearMessages();
        })
    }

    clearMessages() {
        setTimeout(() => {
            this.successMessage = '';
            this.errorMessage = '';
        }, 5000);
    }

}