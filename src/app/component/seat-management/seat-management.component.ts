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
 room = { width: 10, height: 8 };
  seatConfig = {
    left: 5,
    right: 4,
    back: 8,
    entryLeft: 4,
    entryRight: 5
  };



  
  
    grid: any[][] = [];
  seatCounter = 1;
  isMouseDown = false;

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
    console.log('onmouseup');
    
  }


  generateGrid() {
  const { width, height } = this.room;
  this.grid = Array.from({ length: height }, () => Array(width).fill(null));
  this.seatCounter = 1;
  this.placeSeats('left', (i: number) => [i, 0]);
  this.placeSeats('right', (i: number) => [i, width - 1]);
  this.placeSeats('back', (i: number) => [height - 1, i]);
  this.placeSeats('entryLeft', (i: number) => [0, i]);
  this.placeSeats('entryRight', (i: number) => [0, width - 1 - i]);

  console.log('grid', this.grid);
  for (let col = 0; col < this.room.width; col++) {
  if (!this.grid[0][col]) {
    this.grid[0][col] = { type: 'door' };
  }
}
  
}


  placeSeats(side: SeatConfigKey, getCoords: (i: number) => number[]) {
    const count = this.seatConfig[side];
    for (let i = 0; i < count; i++) {
      const [row, col] = getCoords(i);
      if (this.grid[row] && this.grid[row][col] === null) {
        this.grid[row][col] = {
          id: `S${this.seatCounter++}`,
          status: 'available'
        };
      }
    }
  }

  onSeatMouseDown(row: number, col: number) {
    this.isMouseDown = true;
    this.toggleSeat(row, col);
    console.log('onseatMouseDown');
    
  }

  onSeatMouseEnter(row: number, col: number) {
    if (this.isMouseDown) {
      this.toggleSeat(row, col);
      console.log("onseatMouseEnter");
      
    }
  }

  toggleSeat(row: number, col: number) {
    const cell = this.grid[row][col];
    if (cell === null) {
      this.grid[row][col] = {
        id: `S${this.seatCounter++}`,
        status: 'available'
      };
    } else {
      this.grid[row][col] = null;
    }
  }

  saveToDB() {
    const seats = [];
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const seat = this.grid[row][col];
        if (seat) {
          seats.push({ id: seat.id, row, col, status: seat.status });
        }
      }
    }
    console.log('Saving seats:', seats);
    // Replace with API call to backend
  }
}
