// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartApiUrl = 'http://localhost:3000/api/cart';
  private orderApiUrl = 'http://localhost:3000/api/orders'; 

  constructor(private http: HttpClient) { }

  /**
   * Fetches the cart data for a specific user from the backend.
   * @param userId The ID of the user whose cart to fetch.
   * @returns An Observable that emits the cart data (including items and product details).
   */
  getCart(userId: number): Observable<any> {
    return this.http.get<any>(`${this.cartApiUrl}/${userId}`);
  }

  /**
   * Adds a product to the user's cart via backend API.
   * @param userId The ID of the user.
   * @param productId The ID of the product to add.
   * @param quantity The quantity to add.
   * @param priceAtAdd The price of the product at the moment of adding (for backend).
   * @returns An Observable that emits the backend response.
   */
  addToCart(userId: number, productId: number, quantity: number, priceAtAdd: number): Observable<any> {
    const body = { userId, productId, quantity, priceAtAdd };
    return this.http.post<any>(`${this.cartApiUrl}/items`, body);
  }

  /**
   * Updates the quantity of a specific cart item on the backend.
   * @param userId The ID of the user.
   * @param cartItemId The ID of the cart item to update.
   * @param newQuantity The new quantity for the item.
   * @returns An Observable that emits the backend response.
   */
  updateCartItemQuantity(userId: number, cartItemId: number, newQuantity: number): Observable<any> {
    const body = { userId, quantity: newQuantity };
    return this.http.put<any>(`${this.cartApiUrl}/items/${cartItemId}`, body);
  }

  /**
   * Removes a specific cart item from the backend.
   * @param userId The ID of the user.
   * @param cartItemId The ID of the cart item to remove.
   * @returns An Observable that emits the backend response.
   */
  removeCartItem(userId: number, cartItemId: number): Observable<any> {
    return this.http.request('delete', `${this.cartApiUrl}/items/${cartItemId}`, { body: { userId } });
  }

  /**
   * Clears all items from a user's cart on the backend.
   * @param userId The ID of the user whose cart to clear.
   * @returns An Observable that emits the backend response.
   */
  clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.cartApiUrl}/clear/${userId}`);
  }

  /**
   * Triggers the checkout process to create an order from the user's cart.
   * @param userId The ID of the user completing the purchase.
   * @returns An Observable that emits the created order object from the backend.
   */
  checkout(userId: number): Observable<any> {
    const body = { userId };
    return this.http.post<any>(this.orderApiUrl, body);
  }
}
