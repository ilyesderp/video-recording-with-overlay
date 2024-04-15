import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-overlay-elements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay-elements.component.html',
  styleUrl: './overlay-elements.component.scss'
})
export class OverlayElementsComponent {

  startChrono(){
    alert("chrono demarré");
  }
}
