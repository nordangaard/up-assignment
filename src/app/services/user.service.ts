import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';
import { randomUser } from './helpers/random';

const USERS: User[] = Array(25)
  .fill(null)
  .map((_, idx) => randomUser());

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>(USERS);
  private users$ = this.usersSubject.asObservable();

  constructor() {}

  getUsers() {
    // Showing that data can be passed either as observable or value
    return this.usersSubject.getValue();
  }
}
