import { Component } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css'],
  imports: [CommonModule, CartItemComponent, CartSummaryComponent],
})
export class CartComponent {
  cartItems = [
    {
      name: "טלוויזיה LG 75 אינץ' 4K",
      price: 4990,
      quantity: 1,
      imageUrl: 'tv'
    }
  ];

  addItem() {
  this.cartItems.push({
    name: "סמארטפון Samsung Galaxy S24",
    price: 3490,
    quantity: 1,
    imageUrl: 'tv'
  });
}

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onRemoveItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  onQuantityChange(index: number, quantity: number) {
    this.cartItems[index].quantity = quantity;
  }

  onCheckout() {
    alert('מעבר לתשלום...');
  }
}
