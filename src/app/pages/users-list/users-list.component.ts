import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TColumnComponent } from '../../data-table/t-column/t-column.component';
import { TGridComponent } from '../../data-table/t-grid/t-grid.component';
import { Column } from '../../data-table/t-grid/types/column';
import {
  PaginationChangeEvent,
  SortChangeEvent,
} from '../../data-table/t-grid/types/events';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';

const COLUMNS: Column<User>[] = [
  {
    name: 'Customer Number',
    property: 'id',
    sortable: false,
    displayed: true,
  },
  {
    name: 'First name',
    property: 'firstName',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Last name',
    property: 'lastName',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Email',
    property: 'email',
    sortable: true,
    displayed: true,
  },
  {
    name: 'City',
    property: 'city',
    sortable: true,
    displayed: true,
  },
];

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, TGridComponent, TColumnComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  colSubject = new BehaviorSubject<Column<User>[]>(COLUMNS);
  columns$ = this.colSubject.asObservable();

  constructor(private userService: UserService) {}

  users$ = this.userService.getUsers();
  pageSize = null;

  onSortChange(event: SortChangeEvent) {
    // console.log('Sort change!', event);
  }

  onPaginationChange(event: PaginationChangeEvent) {
    // console.log('Pagination change!', event);
  }
}
