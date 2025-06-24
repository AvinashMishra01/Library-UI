
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
type SeatConfigKey = 'left' | 'right' | 'back' | 'entryLeft' | 'entryRight';

interface Room {
  width: number;
  height: number;
  config: Record<SeatConfigKey, number>;
  grid: any[][];
}
@Component({
  selector: 'app-roomconfiguration',
  imports: [CommonModule,FormsModule],
  templateUrl: './roomconfiguration.component.html',
  styleUrl: './roomconfiguration.component.css'
})
export class RoomconfigurationComponent {
 roomTemplate = { width: 10, height: 8 };
  seatConfigTemplate: Record<SeatConfigKey, number> = {
    left: 5,
    right: 4,
    back: 8,
    entryLeft: 4,
    entryRight: 5
  };

  rooms: Room[] = [];
  seatCounter = 1;
  isMouseDown = false;

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isMouseDown = false;
  }

  addRoom() {
    const newRoom: Room = {
      width: this.roomTemplate.width,
      height: this.roomTemplate.height,
      config: { ...this.seatConfigTemplate },
      grid: []
    };
    newRoom.grid = this.generateGrid(newRoom);
    this.rooms.push(newRoom);
  }

  generateGrid(room: Room): any[][] {
    const { width, height, config } = room;
    const grid = Array.from({ length: height }, () => Array(width).fill(null));
    this.placeSeats(grid, 'left', config.left, (i) => [i, 0]);
    this.placeSeats(grid, 'right', config.right, (i) => [i, width - 1]);
    this.placeSeats(grid, 'back', config.back, (i) => [height - 1, i]);
    this.placeSeats(grid, 'entryLeft', config.entryLeft, (i) => [0, i]);
    this.placeSeats(grid, 'entryRight', config.entryRight, (i) => [0, width - 1 - i]);

    for (let col = 0; col < width; col++) {
      if (!grid[0][col]) {
        grid[0][col] = { type: 'door' };
      }
    }

    return grid;
  }

  placeSeats(grid: any[][], side: SeatConfigKey, count: number, getCoords: (i: number) => number[]) {
    for (let i = 0; i < count; i++) {
      const [row, col] = getCoords(i);
      if (grid[row] && grid[row][col] === null) {
        grid[row][col] = {
          id: `S${this.seatCounter++}`,
          status: 'available'
        };
      }
    }
  }

  onSeatMouseDown(row: number, col: number, roomIndex: number) {
    this.isMouseDown = true;
    this.toggleSeat(row, col, roomIndex);
  }

  onSeatMouseEnter(row: number, col: number, roomIndex: number) {
    if (this.isMouseDown) {
      this.toggleSeat(row, col, roomIndex);
    }
  }

  toggleSeat(row: number, col: number, roomIndex: number) {
    const grid = this.rooms[roomIndex].grid;
    const cell = grid[row][col];
    if (cell === null) {
      grid[row][col] = {
        id: `S${this.seatCounter++}`,
        status: 'available'
      };
    } else {
      grid[row][col] = null;
    }
  }

  saveToDB() {
    this.rooms.forEach((room, index) => {
      const seats = [];
      for (let row = 0; row < room.grid.length; row++) {
        for (let col = 0; col < room.grid[row].length; col++) {
          const seat = room.grid[row][col];
          if (seat) {
            seats.push({ id: seat.id, row, col, status: seat.status });
          }
        }
      }
      console.log(`Room ${index + 1} seats:`, seats);
    });
  }
}
