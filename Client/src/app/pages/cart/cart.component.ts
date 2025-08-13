// src/app/pages/cart/cart.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItemComponent } from './cart-component/cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-component/cart-summary/cart-summary.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; // Import Router for navigation

interface CartItemDisplay {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price_at_add: number;
  product: {
    id: number;
    title: string;
    price: number;
    image_url: string;
  };
}

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, CartItemComponent, CartSummaryComponent],
})
export class CartComponentCombined implements OnInit, OnDestroy {
  cartItems: CartItemDisplay[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  private authSubscription!: Subscription;
  private currentUserId: number | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user ? user.id : null;
      if (this.currentUserId) {
        this.loadCartData(this.currentUserId);
      } else {
        this.cartItems = [];
        this.errorMessage = 'Please log in to view your cart.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadCartData(userId: number): void {
    this.loading = true;
    this.errorMessage = '';

    this.cartService.getCart(userId).subscribe({
      next: (response) => {
        console.log('CartComponent: Raw backend response for cart:', response);
        console.log('CartComponent: Raw cartItems array from response:', response?.cartItems);

        if (response && response.cartItems) {
          this.cartItems = response.cartItems.map((item: any) => ({
            id: item.cart_item_id,
            cart_id: item.cart_id,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_add: Number(item.price_at_add),
            product: {
              id: item.product.id,
              title: item.product.title,
              price: Number(item.product.price),
              image_url: item.product.image_url || 'https://placehold.co/100x100?text=No+Image'
            }
          }));
          console.log('CartComponent: Mapped cart items (for display):', this.cartItems);
        } else {
          this.cartItems = [];
          console.log('CartComponent: No cart items found in response or response.cartItems is null/undefined.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('CartComponent: Error fetching cart data:', error);
        this.errorMessage = 'Failed to load cart. Please try again later.';
        this.loading = false;
      }
    });
  }

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price_at_add * item.quantity), 0);
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  onRemoveItem(cartItemId: number) {
    if (!this.currentUserId) {
      this.errorMessage = 'User not logged in. Cannot remove item.';
      return;
    }
    if (confirm('האם אתה בטוח שברצונך להסיר פריט זה מהעגלה?')) {
      const originalCartItems = [...this.cartItems];
      this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);

      this.cartService.removeCartItem(this.currentUserId, cartItemId).subscribe({
        next: (response) => {
          console.log('Item removed from cart (backend confirmed):', response);
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error removing item from cart (backend error):', error);
          this.errorMessage = error.error?.message || 'Failed to remove item. Please try again.';
          this.cartItems = originalCartItems;
        }
      });
    }
  }

  onQuantityChange(cartItemId: number, newQuantity: number) {
    if (!this.currentUserId) {
      this.errorMessage = 'User not logged in. Cannot update quantity.';
      return;
    }
    if (newQuantity < 1 || isNaN(newQuantity)) {
      alert('כמות חייבת להיות מספר חיובי.');
      return;
    }

    const itemToUpdate = this.cartItems.find(item => item.id === cartItemId);
    if (itemToUpdate) {
        const originalQuantity = itemToUpdate.quantity;
        itemToUpdate.quantity = newQuantity;

        this.cartService.updateCartItemQuantity(this.currentUserId, cartItemId, newQuantity).subscribe({
            next: (response) => {
                console.log('Quantity updated (backend confirmed):', response);
                this.errorMessage = '';
            },
            error: (error) => {
                console.error('Error updating quantity (backend error):', error);
                this.errorMessage = error.error?.message || 'Failed to update quantity. Please try again.';
                itemToUpdate.quantity = originalQuantity;
            }
        });
    }
  }

  clearCart() {
    if (!this.currentUserId) {
      this.errorMessage = 'User not logged in. Cannot clear cart.';
      return;
    }
    if (confirm('האם אתה בטוח שברצונך לרוקן את העגלה?')) {
      const originalCartItems = [...this.cartItems];
      this.cartItems = [];

      this.cartService.clearCart(this.currentUserId).subscribe({
        next: (response) => {
          console.log('Cart cleared (backend confirmed):', response);
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error clearing cart (backend error):', error);
          this.errorMessage = error.error?.message || 'Failed to clear cart. Please try again.';
          this.cartItems = originalCartItems;
        }
      });
    }
  }

  onCheckout() {
    if (!this.currentUserId) {
      alert('אנא התחבר כדי להשלים את הרכישה.');
      return;
    }
    if (this.cartItems.length === 0) {
      alert('העגלה ריקה! אנא הוסף פריטים לפני מעבר לתשלום.');
      return;
    }

    if (confirm('האם אתה בטוח שברצונך להשלים את הרכישה?')) {
      this.loading = true;
      this.errorMessage = '';

      this.cartService.checkout(this.currentUserId)
        .subscribe({
          next: (response) => {
            console.log('Checkout successful! Order:', response.order);
            // Instead of alert, navigate to the order confirmation page
            // Make sure the backend response.order object has order_id
            if (response.order && response.order.order_id) {
                this.router.navigate(['/order-confirmation', response.order.order_id]);
            } else {
                alert('הזמנה נוצרה, אך לא ניתן לנווט לדף האישור. אנא בדוק את ההזמנות שלך.');
                this.router.navigate(['/']); // Fallback to home
            }
            this.cartItems = []; // Clear local cart items after successful checkout
            this.loading = false;
          },
          error: (error) => {
            console.error('Checkout error:', error);
            this.loading = false;
            this.errorMessage = error.error?.message || 'אירעה שגיאה בעת השלמת הרכישה. אנא נסה שוב.';
            alert(this.errorMessage);
          }
        });
    }
  }
}
