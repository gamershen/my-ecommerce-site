// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/users/login'; //users from main.js and login from userService

  constructor(private http: HttpClient) { }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<any>(this.apiUrl, credentials, httpOptions);
  }
}