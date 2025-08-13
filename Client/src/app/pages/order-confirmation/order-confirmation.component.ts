// src/app/order-confirmation/order-confirmation.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; 
import { OrderService } from '../../services/order.service'; 
import { Subscription } from 'rxjs'; 

// Define interfaces to match your backend Order and OrderItem structure
interface OrderItemDisplay {
  order_item_id: number;
  quantity: number;
  price_at_purchase: number;
  product: {
    id: number;
    title: string;
    image_url: string;
    price: number;
  };
}

interface OrderDisplay {
  order_id: number;
  user_id: number;
  order_date: string; // Date as string from backend
  total_amount: number;
  status: string;
  orderItems: OrderItemDisplay[];
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe], 
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order: OrderDisplay | undefined;
  isLoading = true;
  errorMessage: string | null = null;
  private routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private orderService: OrderService // Inject your OrderService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the orderId
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const orderIdParam = params.get('orderId');
      if (orderIdParam) {
        const orderId = Number(orderIdParam);
        if (!isNaN(orderId)) {
          this.fetchOrderDetails(orderId);
        } else {
          this.errorMessage = 'Invalid order ID provided.';
          this.isLoading = false;
        }
      } else {
        this.errorMessage = 'No order ID provided in the URL.';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  fetchOrderDetails(orderId: number): void {
    this.isLoading = true;
    this.errorMessage = null; // Clear previous errors
    this.order = undefined; // Clear previous order data

    this.orderService.getOrderById(orderId).subscribe({
      next: (data: OrderDisplay) => {
        if (data) {
          this.order = data;
          console.log('OrderConfirmationComponent: Fetched order details:', this.order);
        } else {
          this.errorMessage = 'Order not found.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('OrderConfirmationComponent: Error fetching order details:', error);
        this.errorMessage = error.error?.message || 'Failed to load order details. Please try again.';
        this.isLoading = false;
      }
    });
  }

  goToHomepage(): void {
    this.router.navigate(['/']); // Navigate to your homepage or product listing
  }

  // Optional: Go to user's orders history page (if you build one)
  goToMyOrders(): void {
    // Assuming you have a route like /my-orders/:userId
    // this.router.navigate(['/my-orders', this.order?.user_id]);
  }
}
