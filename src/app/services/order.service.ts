import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../types/order';
import { User } from '../types/user';
import { randomRange, randomUser } from './helpers/random';

const generateOrder = (idx: number, user: User): Order => ({
  orderNo: idx + 1,
  orderDate: new Date(2021, randomRange(0, 11), randomRange(1, 28)),
  customer: user.firstName + ' ' + user.lastName,
  quantity: randomRange(100, 1000),
  totalAmount: '$' + randomRange(200, 5000).toString(),
});

const ORDERS: Order[] = Array(100)
  .fill(null)
  .map((_, idx) => generateOrder(idx, randomUser()));

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>(ORDERS);
  private orders$ = this.ordersSubject.asObservable();

  getOrders() {
    return this.orders$;
  }
}
