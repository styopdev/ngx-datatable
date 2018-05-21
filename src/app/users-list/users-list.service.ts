import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs/';
import { User } from './user.model';
import { UsersList } from './mock-user-list';

@Injectable()
export class UsersListService {
  usersListUrl = 'http://jsteam.sibedge.com/raw/task/users.json';
  loadingUsers = true;
  mockUsers: Array<User>;

  constructor(
    private http: HttpClient
  ) {
    this.initMockUsers();
  }

  getUsers (): Observable<User[]> {
    return of(this.mockUsers)
      .pipe(
        delay(3000),
        tap(() => this.loadingUsers = false)
      );
  }

  initMockUsers () {
    this.mockUsers = UsersList.results;
  }
}
