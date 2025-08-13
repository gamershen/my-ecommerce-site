// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders'; // Backend API URL for orders

  constructor(private http: HttpClient) { }

  /**
   * Fetches a specific order by its ID from the backend.
   * @param orderId The ID of the order to retrieve.
   * @returns An Observable that emits the order data.
   */
  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  /**
   * Fetches all orders for a specific user from the backend.
   * (Optional: you might need this for a "My Orders" page later)
   * @param userId The ID of the user whose orders to retrieve.
   * @returns An Observable that emits an array of order data.
   */
  getUserOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
