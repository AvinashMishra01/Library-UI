import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
type SeatConfigKey = 'left' | 'right' | 'back' | 'entryLeft' | 'entryRight';

@Component({
  selector: 'app-seat-management',
  imports: [CommonModule,FormsModule],
  templateUrl: './seat-management.component.html',
  styleUrl: './seat-management.component.css'
})
export class SeatManagementComponent {

}
