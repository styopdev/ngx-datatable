import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule } from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { UsersListService } from './users-list/users-list.service';
import { LoaderComponent } from './users-list/loader/loader.component';
import { UserListComponent } from './users-list/users-list.component';
import { PaginationComponent } from './users-list/pagination/pagination.component';

import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    UserListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [UsersListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
