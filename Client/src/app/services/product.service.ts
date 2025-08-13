// src/app/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'http://localhost:3000/api/products'; 

  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`ProductService: Fetching product from: ${url}`);
    return this.http.get<any>(url);
  }

  getAllProducts(): Observable<any[]> {
    console.log(`ProductService: Fetching all products from: ${this.apiUrl}`);
    return this.http.get<any[]>(this.apiUrl);
  }
}