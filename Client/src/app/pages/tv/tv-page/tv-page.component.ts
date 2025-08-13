import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tv-page.component.html',
  styleUrl: './tv-page.component.css'
})
export class TvPageComponent {
  image = 'tv.png'

}
