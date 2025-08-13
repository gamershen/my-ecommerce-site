// src/app/pages/header/header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; 
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy { 
  searchimg = "search.png";
  loginimg = "login4.png";
  logoimg = "logo4.png";
  cartimg = "cart4.png";

  loggedInUserName: string | null = null;
  private authSubscription!: Subscription; // To hold the subscription

  constructor(private router: Router, private authService: AuthService) { } 
  ngOnInit(): void {
    // Subscribe to currentUser$ for real-time updates
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      if (user && user.name) {
        this.loggedInUserName = user.name;
      } else {
        this.loggedInUserName = null;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout(); // Use AuthService to handle logout
    this.router.navigate(['/login']); // Navigate after logout
  }
}
