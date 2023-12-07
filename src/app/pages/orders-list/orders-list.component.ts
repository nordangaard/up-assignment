import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { TColumnComponent } from '../../data-table/t-column/t-column.component';
import { TGridComponent } from '../../data-table/t-grid/t-grid.component';
import { Column } from '../../data-table/t-grid/types/column';
import {
  PaginationChangeEvent,
  SortChangeEvent,
} from '../../data-table/t-grid/types/events';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';

const COLUMNS: Column<Order>[] = [
  {
    name: 'Order Number',
    property: 'orderNo',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Customer',
    property: 'customer',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Order date',
    property: 'orderDate',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Quantity',
    property: 'quantity',
    sortable: true,
    displayed: true,
  },
  {
    name: 'Total',
    property: 'totalAmount',
    sortable: false,
    displayed: true,
  },
];

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, TGridComponent, TColumnComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  colSubject = new BehaviorSubject<Column<Order>[]>(COLUMNS);
  columns$ = this.colSubject.asObservable();

  displayedColumns$ = this.columns$.pipe(
    map((columns) => columns.filter((col) => col.displayed))
  );

  orders$ = this.orderService.getOrders();

  pageSize = 15;
  sortable = true;

  settingsOpen = false;

  constructor(private orderService: OrderService) {}

  onToggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  setDisplayColumn(changedColumn: Column<Order>, event: Event) {
    const displayed = (event.target as HTMLInputElement).checked;

    const columns = [...this.colSubject.value];
    const columnIdx = columns.findIndex((col) => col === changedColumn);
    this.colSubject.next([
      ...columns.slice(0, columnIdx),
      { ...changedColumn, displayed },
      ...columns.slice(columnIdx + 1),
    ]);
  }

  onSortChange(event: SortChangeEvent) {
    // console.log('Sort change!', event);
  }

  onPaginationChange(event: PaginationChangeEvent) {
    // console.log('Pagination change!', event);
  }
}
