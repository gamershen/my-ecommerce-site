import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TvPageComponent } from './tv-page/tv-page.component';

@Component({
  selector: 'app-tv',
  imports: [CommonModule,RouterLink,TvPageComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css'
})
export class TvComponent {

}
