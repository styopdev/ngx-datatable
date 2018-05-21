import { Component, OnInit } from '@angular/core';
import { UsersListService } from './users-list.service';
import { User } from './user.model';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  usersReady = false;
  rowsCount = 10;
  currentPage = 1;
  currentPageItems: Array<User>;
  filteredItems: Array<User>;
  firstNameFilter = '';
  cityNameFilter = '';
  phoneNumberFilter = '';
  startDate: any;
  endDate: any;

  constructor(
    private userListService: UsersListService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  get totalItems () {
    return this.filteredItems.length;
  }

  getUsers () {
    this.userListService.getUsers().subscribe(users => {
      this.users = users;
      this.usersReady = true;
      this.filteredItems = [...this.users];
      this.initItems();
    });
  }

  initItems () {
    const page = this.currentPage - 1;
    const itemsStart = page * this.rowsCount;
    const itemsEnd = itemsStart + this.rowsCount;
    this.currentPageItems = this.filteredItems.slice(itemsStart, itemsEnd);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.initItems();
  }

  applyFilters () {
    const filteredItems = this.users.filter(item => {
      if (!this.filterByName(item)) {
        return false;
      }

      if (!this.filterByCity(item)) {
        return false;
      }

      if (!this.filterByDob(item)) {
        return false;
      }

      if (!this.filterByPhone(item)) {
        return false;
      }
      return true;
    });

    this.filteredItems = [...filteredItems];
    this.currentPage = 1;
    this.initItems();
  }

  filterByName (item: User) {
    const name = item.name.first.toLowerCase();
    const term = this.firstNameFilter.toLowerCase();
    return name.indexOf(term) > -1;
  }

  filterByCity (item: User) {
    const cityName = item.location.city.toLowerCase();
    const term = this.cityNameFilter.toLowerCase();
    return cityName.indexOf(term) > -1;
  }

  filterByDob(item: User) {
    const startDate = this.startDate ? this.startDate : -Infinity;
    const endDate = this.endDate ? this.endDate : Infinity;
    const userDob = new Date(item.dob);
    return (userDob > startDate && userDob < endDate);
  }

  filterByPhone (item: User) {
    const phoneNumber = item.phone.replace(/[()-]/g, '');
    const term = this.phoneNumberFilter ? this.phoneNumberFilter : '';
    return phoneNumber.indexOf(term) > -1;
  }

  changeRowsCount (count: number) {
    const rowsChangedBy = this.rowsCount / count;
    let newPage = Math.round(this.currentPage * rowsChangedBy);
    const maxPages = Math.ceil(this.filteredItems.length / count);

    if (newPage > maxPages) {
      newPage = maxPages;
    }
    this.currentPage = newPage;
    this.rowsCount = count;
    this.initItems();
  }

  clearFilters() {
    this.phoneNumberFilter = '';
    this.cityNameFilter = '';
    this.firstNameFilter = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredItems = this.users;
    this.currentPage = 1;
    this.initItems();
  }
}
