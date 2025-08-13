import { Component } from '@angular/core';
import { HeaderComponent } from '../../../header/header.component'; 
import { FooterComponent } from '../../../footer/footer.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CategoriesComponent,CarouselComponent,ProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
