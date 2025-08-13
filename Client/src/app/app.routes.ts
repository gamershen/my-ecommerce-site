// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home-combined/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponentCombined } from './pages/cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { TvComponent } from './pages/tv/tv.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponentCombined },
  { path: 'header', component: HeaderComponent },
  { path: 'tv', component: TvComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'order-confirmation/:orderId', component: OrderConfirmationComponent },
  { path: 'my-orders', component: UserOrdersComponent },
  { path: 'profile', component: ProfileComponent },
];

