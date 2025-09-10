import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs';
interface Seat {
  id: number;
  label: string;
  isBooked: boolean;
   bookedUntil?: Date; 
  remainingTime?: string; 
  bookedBy?: {
    name: string;
    email: string;
    mobile: string;
  };
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
  styleUrl: './seat-management.component.css',
  // changeDetection : ChangeDetectionStrategy.OnPush
})

export class SeatManagementComponent implements OnInit {
private timerInterval: any;
private timerSub!: Subscription;
  rooms: Room[] = [
    {
      id: 1,
      name: 'Room A',
      seats: [
        { id: 1, label: 'A1', isBooked: false },
        { id: 2, label: 'A2', isBooked: true, bookedUntil: new Date(Date.now() + 1 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra', email: 'avinash@example.com', mobile: '9876543210' }},
        { id: 3, label: 'A3', isBooked: false },

        { id: 11, label: 'AA1', isBooked: false },
        { id: 12, label: 'AA2', isBooked: true,  bookedUntil: new Date(Date.now() + 5 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra-2 ', email: 'avinash@example.com', mobile: '9876543210' } },
        { id: 13, label: 'AA3', isBooked: false },

        { id: 21, label: 'AB1', isBooked: false },
        { id: 22, label: 'AB2', isBooked: true, bookedUntil: new Date(Date.now() + 2 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra-3 ', email: 'avinash@example.com', mobile: '9876543210' }  },
        { id: 23, label: 'AB3', isBooked: false },

        { id: 31, label: 'AC1', isBooked: false },
        { id: 32, label: 'AC2', isBooked: true, bookedUntil: new Date(Date.now() + 10 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra-4 ', email: 'avinash@example.com', mobile: '9876543210' }  },
        { id: 33, label: 'AC3', isBooked: false },

        { id: 41, label: 'AD1', isBooked: false },
        { id: 42, label: 'AD2', isBooked: true,  bookedUntil: new Date(Date.now() + 3 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra-5', email: 'avinash@example.com', mobile: '9876543210' }  },
        { id: 43, label: 'AD3', isBooked: false },

        { id: 44, label: 'AD1', isBooked: false },
        { id: 45, label: 'AD2', isBooked: true, bookedUntil: new Date(Date.now() + 4 * 60 * 1000),  bookedBy: { name: 'Avinash Mishra-6', email: 'avinash@example.com', mobile: '9876543210' }  },
        { id: 46, label: 'AD3', isBooked: false },

        { id: 47, label: 'ADA1', isBooked: false },
        { id: 48, label: 'ADA2', isBooked: true, bookedUntil: new Date(Date.now() + 6 * 60 * 1000) },
        { id: 49, label: 'ADA3', isBooked: false },
        { id: 50, label: 'ADA4', isBooked: false },
        { id: 51, label: 'ADA5', isBooked: true , bookedUntil: new Date(Date.now() + 7 * 60 * 1000)},
        { id: 52, label: 'ADA6', isBooked: false },
        { id: 53, label: 'ADA7', isBooked: false },
        { id: 54, label: 'ADA8', isBooked: true, bookedUntil: new Date(Date.now() + 8 * 60 * 1000) },
        { id: 55, label: 'ADA9', isBooked: false },
      ]
    },
    {
      id: 2,
      name: 'Room B',
      seats: [
        { id: 1, label: 'B1', isBooked: true, bookedUntil: new Date(Date.now() + 9 * 60 * 1000) },
        { id: 2, label: 'B2', isBooked: false },
        { id: 3, label: 'B3', isBooked: false }
      ]
    }
  ];

  constructor(private modalService : NgbModal){}
ngOnInit() {
    this.timerSub = interval(1000).subscribe(() => {
      this.updateCountdowns();
    });
}

 
  updateCountdowns() {
    this.rooms.forEach(room => {
      room.seats.forEach(seat => {
        if (seat.isBooked && seat.bookedUntil) {
          const diff = seat.bookedUntil.getTime() - Date.now();
          if (diff > 0) {
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            seat.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          } else {
            // Auto-unbook
            seat.isBooked = false;
            seat.bookedUntil = undefined;
            seat.remainingTime = undefined;
          }
        }
      });
    });
  }

  toggleSeat(roomId: number, seatId: number) {
    const room = this.rooms.find(r => r.id === roomId);
    const seat = room?.seats.find(s => s.id === seatId);

    if (seat) {
      if (seat.isBooked) {
        // Release seat
        seat.isBooked = false;
        seat.bookedUntil = undefined;
        seat.remainingTime = undefined;
      } else {
        // Book for 5 minutes (example)
        seat.isBooked = true;
        seat.bookedUntil = new Date(Date.now() + 5 * 60 * 1000);
      }
    }
  }

selectedSeat?: Seat;
showModal = false;

openSeatModal(seat: Seat, modal:any) {
  this.modalService.open(modal, {backdrop:'static', centered:true  })
  if (seat.isBooked) {
    this.selectedSeat = seat;
    this.showModal = true;
  }
}

closeModal() {
  this.showModal = false;
  this.selectedSeat = undefined;
  this.modalService.dismissAll();
}

extendBooking(seat: any) {
  console.log("Extend booking for:", seat);
  // your logic
  this.closeModal();
}
unbookSeat(seat: any) {
  console.log("Unbook seat:", seat);
  seat.isBooked = false;
  seat.user = null;
  seat.bookedUntil = null;
  seat.remainingTime = null;
  this.closeModal();
}

ngOnDestroy() {
   if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
}
}
