// src/app/pages/profile/profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, User } from '../../services/auth.service'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // הרשמה לשינויים במצב המשתמש המחובר
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      // אם המשתמש לא מחובר, ניתן להפנות אותו לדף התחברות
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * מנווט לדף ההזמנות הקודמות של המשתמש.
   */
  goToMyOrders(): void {
    this.router.navigate(['/my-orders']);
  }

  /**
   * מתנתק את המשתמש ומנווט לדף הבית.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // פונקציות עתידיות לעדכון פרטים (דורש API בבקאנד)
  editProfile(): void {
    alert('פונקציונליות עריכת פרופיל תתווסף בעתיד!');
    // כאן תהיה לוגיקה לניווט לדף עריכת פרופיל או פתיחת מודאל
  }

  changePassword(): void {
    alert('פונקציונליות שינוי סיסמה תתווסף בעתיד!');
    // כאן תהיה לוגיקה לניווט לדף שינוי סיסמה או פתיחת מודאל
  }
}
