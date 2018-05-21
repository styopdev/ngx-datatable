import { Component } from '@angular/core';
import { UsersListService } from './users-list/users-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private usersListService: UsersListService
  ) {}
}
