// src/app/pages/cart/cart-component/cart-summary/cart-summary.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input() totalItems: number = 0; 
  @Input() totalPrice: number = 0; 
  @Output() clearCart = new EventEmitter<void>(); 
  @Output() checkout = new EventEmitter<void>(); 

  onClear() {
    this.clearCart.emit();
  }

  onCheckout() {
    this.checkout.emit();
  }
}
