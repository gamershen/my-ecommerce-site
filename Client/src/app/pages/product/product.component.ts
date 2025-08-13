// src/app/pages/product/product.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs'; 

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category_id?: number;
  stock_quantity?: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy { 
  productId: string | null = null;
  product: Product | undefined;
  loading: boolean = true;
  errorMessage: string = '';
  quantity: number = 1;
  message: string = '';
  private authSubscription!: Subscription; // To manage subscription
  private currentUserId: number | null = null; // Store user ID locally

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    // Subscribe to AuthService for user ID
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user ? user.id : null;
      console.log('ProductComponent: Current User ID from AuthService:', this.currentUserId);
    });

    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      console.log('ProductComponent: Product ID from URL:', this.productId);
      if (this.productId) {
        this.loadProductData(+this.productId);
      } else {
        this.errorMessage = 'שגיאה: מזהה מוצר לא נמצא בכתובת האתר.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadProductData(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.product = undefined;

    this.productService.getProductById(id.toString()).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        console.log('ProductComponent: Fetched product data:', this.product);
        console.log('Type of product.id:', typeof this.product?.id);
        console.log('Type of product.price:', typeof this.product?.price);
      },
      error: (error: HttpErrorResponse) => {
        console.error('ProductComponent: שגיאה בטעינת פרטי מוצר:', error);
        this.loading = false;
        if (error.status === 404) {
          this.errorMessage = 'מוצר לא נמצא.';
        } else {
          this.errorMessage = 'אירעה שגיאה בטעינת המוצר. אנא נסה שוב מאוחר יותר.';
        }
        this.product = undefined;
      }
    });
  }

  addToCart(): void {
    this.message = '';

    if (!this.product || typeof this.product.id === 'undefined' || typeof this.product.price === 'undefined') {
        this.message = 'שגיאה: פרטי מוצר לא טעונים כהלכה.';
        console.error('ניסיון להוסיף לעגלה ללא נתוני מוצר מלאים.');
        console.log('Current product object:', this.product);
        return;
    }

    if (this.quantity < 1 || isNaN(this.quantity)) {
      this.message = 'אנא הזן כמות חוקית (מספר חיובי).';
      return;
    }

    // Use currentUserId from AuthService subscription
    if (!this.currentUserId) {
      this.message = 'אנא התחבר כדי להוסיף פריטים לעגלה.';
      return;
    }

    const productIdNum = Number(this.product.id);
    const priceAtAddNum = Number(this.product.price);
    const quantityNum = Number(this.quantity);

    if (isNaN(productIdNum) || isNaN(priceAtAddNum) || isNaN(quantityNum) || quantityNum <= 0) {
        this.message = 'שגיאה: ערכים לא חוקיים של מוצר/כמות. אנא נסה שוב.';
        return;
    }

    this.cartService.addToCart(this.currentUserId, productIdNum, quantityNum, priceAtAddNum)
      .subscribe({
        next: (response) => {
          console.log('פריט נוסף לעגלה:', response);
          this.message = 'המוצר נוסף לעגלה בהצלחה!';
        },
        error: (error) => {
          console.error('שגיאה בהוספה לעגלה:', error);
          this.message = error.error?.message || 'אירעה שגיאה בהוספת הפריט לעגלה.';
        }
      });
  }
}
