// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs'; 

// Define a basic User interface to type the user object
export interface User {
  id: number;
  name: string;
  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject holds the current user state and emits it to subscribers
  private currentUserSubject: BehaviorSubject<User | null>;
  // Public Observable for other components to subscribe to
  public currentUser$: Observable<User | null>;

  private apiUrl = 'http://localhost:3000/api/users'; // Your backend user API endpoint

  constructor(private http: HttpClient) {
    // Initialize currentUserSubject from localStorage on service creation
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Getter for quick access to the current user object (snapshot)
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.user) {
          const user: User = response.user;
          localStorage.setItem('currentUser', JSON.stringify(user)); // Persist to localStorage
          this.currentUserSubject.next(user); // Emit new user to all subscribers
          console.log('AuthService: User logged in, state updated and saved to localStorage.');
        } else {
          // If login was "successful" but backend indicates failure (e.g., success:false)
          console.error('AuthService: Login response indicates failure:', response.message);
          throw new Error(response.message || 'Login failed.'); // Propagate error
        }
      }),
      catchError(error => {
        console.error('AuthService: HTTP Login error:', error);
        // Clean up localStorage on failed login, if desired
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null); // Clear user state
        return of({ success: false, message: error.error?.message || 'Network or server error' }); // Return observable with error
      })
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { name, email, password }).pipe(
        tap(response => {
            // For signup, you might not auto-login, but if you do, similar logic as login
            console.log('AuthService: Signup response:', response);
        }),
        catchError(error => {
            console.error('AuthService: HTTP Signup error:', error);
            throw error; // Re-throw the error for the component to handle
        })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser'); // Clear from localStorage
    this.currentUserSubject.next(null); // Emit null to all subscribers
    console.log('AuthService: User logged out, state cleared.');
  }
}
