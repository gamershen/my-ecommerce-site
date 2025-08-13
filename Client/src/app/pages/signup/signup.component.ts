// src/app/pages/signup/signup.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { } 

  onSignup() {
    this.errorMessage = '';

    const signupData = { name: this.name, email: this.email, password: this.password };

    this.authService.signup(signupData.name, signupData.email, signupData.password) 
      .subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          if (response.success) {
            alert('הרשמה בוצעה בהצלחה!');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message || 'Registration failed.';
          }
        },
        error: (error) => {
          console.error('Signup error:', error);
          if (error.status === 409) {
            this.errorMessage = 'מייל זה כבר רשום במערכת.';
            alert("מייל זה כבר קיים במערכת")
          } else if (error.status === 400) {
            this.errorMessage = error.error.message || 'אנא מלא את כל השדות הנדרשים.';
          } else {
            this.errorMessage = 'אירעה שגיאה במהלך ההרשמה. אנא נסה שוב מאוחר יותר.';
          }
        }
      });
  }
}
