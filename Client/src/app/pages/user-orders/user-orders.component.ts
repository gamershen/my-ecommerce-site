// src/app/pages/user-orders/user-orders.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router'; 
import { Subscription } from 'rxjs'; 
import { AuthService } from '../../services/auth.service'; 
import { OrderService } from '../../services/order.service'; 

// Interface definitions for type safety
interface ProductDisplay {
  id: number;
  title: string;
  price: number;
  image_url: string;
}

interface OrderItemDisplay {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  product: ProductDisplay;
}

interface OrderDisplay {
  order_id: number;
  user_id: number;
  order_date: string; // Date string from the server
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'processing'; 
  orderItems: OrderItemDisplay[];
  createdAt: string;
}

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  userOrders: OrderDisplay[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  private authSubscription!: Subscription;
  private currentUserId: number | null = null;

  // Map order statuses to colors for dynamic CSS styling
  orderStatusColors: { [key: string]: string } = {
    'pending': '#ffc107',    // Yellow
    'processing': '#17a2b8', // Light blue
    'completed': '#28a745',  // Green
    'cancelled': '#dc3545'   // Red
  };

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router // Inject Router for navigation
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in the logged-in user's status
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user ? user.id : null;
      if (this.currentUserId) {
        this.loadUserOrders(this.currentUserId);
      } else {
        this.errorMessage = 'אנא התחבר כדי לצפות בהזמנות שלך.'; // Please log in to view your orders.
        this.isLoading = false;
        this.userOrders = [];
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Loads the current user's order list from the server.
   * Applies status logic based on order date.
   * @param userId The ID of the user.
   */
  loadUserOrders(userId: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.orderService.getUserOrders(userId).subscribe({
      next: (orders: OrderDisplay[]) => {
        // Apply date-based status logic
        this.userOrders = orders.map(order => {
          const orderDate = new Date(order.order_date);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - orderDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days

          if (diffDays > 2) {
            order.status = 'completed';
          } else if (diffDays > 1) {
            order.status = 'processing';
          }
          // If diffDays <= 1, status remains as it came from backend (likely 'pending')
          return order;
        });
        this.isLoading = false;
        console.log('UserOrdersComponent: User orders loaded and statuses adjusted:', this.userOrders);
      },
      error: (error) => {
        console.error('UserOrdersComponent: Failed to load user orders:', error);
        this.errorMessage = error.error?.message || 'שגיאה בטעינת ההזמנות. אנא נסה שוב מאוחר יותר.'; // Error loading orders. Please try again later.
        this.isLoading = false;
      }
    });
  }

  /**
   * Generates the aria-label string for the order details button.
   * This avoids mixing Hebrew text with interpolation directly in the HTML attribute.
   * @param orderId The ID of the order.
   * @returns The formatted aria-label string.
   */
  getAriaLabelForOrderDetails(orderId: number): string {
    return `צפה בפרטים מלאים של הזמנה ${orderId}`; // View full details of order
  }

  /**
   * Navigates to the order confirmation page (or full order details page).
   * @param orderId The ID of the order to view.
   */
  viewOrderDetails(orderId: number): void {
    // Navigates to the previously implemented order confirmation / full details page
    this.router.navigate(['/order-confirmation', orderId]);
  }
}
