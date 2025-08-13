// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  loginMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { } 

  onLogin() {
    if (!this.email || !this.password) {
      this.loginMessage = 'Please enter both email and password.';
      return;
    }

    // Use AuthService to handle login
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // AuthService handles localStorage and BehaviorSubject internally
        console.log('Login successful via AuthService:', response);
        if (response.success) { // Check for success from AuthService's response
            this.loginMessage = 'Login successful!';
            this.router.navigate(['/']); // Navigate to home page
        } else {
            // This might happen if backend returns success: false
            this.loginMessage = response.message || 'Login failed.';
            alert("סיסמה או מייל שגויים"); // Keep alert for immediate feedback
        }
      },
      error: (error) => {
        console.error('Login error (from AuthService subscription):', error);
        // Error handling is more consistent here as AuthService will propagate a generic error if network issue
        this.loginMessage = error.message || 'An error occurred during login. Please try again.';
        alert("סיסמה או מייל שגויים"); // Keep alert for immediate feedback
      }
    });
  }
}
