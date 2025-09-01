import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Seat {
  id: number;
  label: string;
  isBooked: boolean;
}

interface Room {
  id: number;
  name: string;
  seats: Seat[];
}
@Component({
  selector: 'app-seat-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './seat-management.component.html',
  styleUrl: './seat-management.component.css'
})

export class SeatManagementComponent {

  rooms: Room[] = [
    {
      id: 1,
      name: 'Room A',
      seats: [
        { id: 1, label: 'A1', isBooked: false },
        { id: 2, label: 'A2', isBooked: true },
        { id: 3, label: 'A3', isBooked: false },

        { id: 11, label: 'AA1', isBooked: false },
        { id: 12, label: 'AA2', isBooked: true },
        { id: 13, label: 'AA3', isBooked: false },

        { id: 21, label: 'AB1', isBooked: false },
        { id: 22, label: 'AB2', isBooked: true },
        { id: 23, label: 'AB3', isBooked: false },

        { id: 31, label: 'AC1', isBooked: false },
        { id: 32, label: 'AC2', isBooked: true },
        { id: 33, label: 'AC3', isBooked: false },

        { id: 41, label: 'AD1', isBooked: false },
        { id: 42, label: 'AD2', isBooked: true },
        { id: 43, label: 'AD3', isBooked: false },

        { id: 51, label: 'AD1', isBooked: false },
        { id: 52, label: 'AD2', isBooked: true },
        { id: 53, label: 'AD3', isBooked: false },

        { id: 51, label: 'AD1', isBooked: false },
        { id: 52, label: 'AD2', isBooked: true },
        { id: 53, label: 'AD3', isBooked: false },
        { id: 54, label: 'AD4', isBooked: false },
        { id: 55, label: 'AD5', isBooked: true },
        { id: 56, label: 'AD6', isBooked: false },
        { id: 57, label: 'AD7', isBooked: false },
        { id: 58, label: 'AD8', isBooked: true },
        { id: 59, label: 'AD9', isBooked: false },
      ]
    },
    {
      id: 2,
      name: 'Room B',
      seats: [
        { id: 1, label: 'B1', isBooked: true },
        { id: 2, label: 'B2', isBooked: false },
        { id: 3, label: 'B3', isBooked: false }
      ]
    }
  ];

  toggleSeat(roomId: number, seatId: number) {
    const room = this.rooms.find(r => r.id === roomId);
    if (room) {
      const seat = room.seats.find(s => s.id === seatId);
      if (seat) {
        seat.isBooked = !seat.isBooked;
      }
    }
  }

}
