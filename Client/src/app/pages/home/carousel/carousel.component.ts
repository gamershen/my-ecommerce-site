import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'] 
})
export class CarouselComponent {
  currentSlide = 0;
  slides = [
    { src: 'passover.jpg', alt: 'Passover Deals' },
    { src: 'phone.jpg', alt: 'Phone Deals' },
    { src: 'ipad.jpg', alt: 'iPad Deals' }
  ];

  ngOnInit() {
    console.log('Carousel component loaded');
    console.log('Current slide:', this.currentSlide);
    console.log('Slides:', this.slides);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  previousSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }
}
