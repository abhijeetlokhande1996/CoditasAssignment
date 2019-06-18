import { Users } from './../models/users.model';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  totalRecords: number;
  userdetails: Users;
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(resp => {
      if (resp) {
        this.userdetails = resp;
        this.totalRecords = this.userdetails.items.length;
      }

    });
  }

}
