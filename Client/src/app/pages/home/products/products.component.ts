import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products = [{id: 1,name: "טלוויזיה LG 75 אינץ' 4K",imageUrl:"tv.png"},
    {id: 2,name: "מקרר Midea HQ-611RWEN",imageUrl: "fridge.png"},
    {id: 3,name: "מחשב נייד Lenovo ThinkPad E15",imageUrl: "pc.png"},
    {id: 4,name: "Sony PlayStation 5",imageUrl: "ps5.png"},
  ]

}
