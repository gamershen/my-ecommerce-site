// src/app/pages/cart/cart-component/cart-item/cart-item.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

// Define the interface for the cart item data this component expects
// This structure matches what the backend sends via CartService
interface CartItemInput {
  id: number; // This is the cart_item_id
  quantity: number;
  price_at_add: number;
  product: {
    title: string;
    image_url: string; // From backend
    price: number; // Current product price (for display)
  };
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule for ngModel
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit { // Implemented OnInit
  @Input() cartItem!: CartItemInput; // <--- This MUST be named 'cartItem'
  @Output() removeItem = new EventEmitter<number>();
  @Output() quantityChange = new EventEmitter<number>();

  // Local quantity for ngModel binding
  localQuantity: number = 1;

  ngOnInit() { // Initialize localQuantity when component initializes
    if (this.cartItem) {
      this.localQuantity = this.cartItem.quantity;
    }
  }

  onRemove() {
    this.removeItem.emit(this.cartItem.id); // Emit the cart_item_id
  }

  onLocalQuantityChange() {
    // Ensure quantity is a positive integer
    if (this.localQuantity < 1 || isNaN(this.localQuantity)) {
      this.localQuantity = 1; // Default to 1 if invalid
    }
    this.quantityChange.emit(this.localQuantity); // Emit the new quantity
  }
}
