import { Users } from './../models/users.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private subject = new BehaviorSubject<Users>(null);
  constructor() { }
  setUsers = (users: Users) => {
    if (users) {
      this.subject.next(users);
    }
  }
  getUsers = () => {
    return this.subject.asObservable();
  }
}
