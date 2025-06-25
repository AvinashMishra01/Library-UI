import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
type SeatConfigKey = 'left' | 'right' | 'back' | 'entryLeft' | 'entryRight';

@Component({
  selector: 'app-seat-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './seat-management.component.html',
  styleUrl: './seat-management.component.css'
})
export class SeatManagementComponent {


  @Input() rooms: any[] = [
    {
      "width": 10,
      "height": 8,
      "config": {
        "left": 5,
        "right": 4,
        "back": 8,
        "entryLeft": 4,
        "entryRight": 5
      },
      "grid": [
        [
          {
            "id": "S1",
            "status": "available"
          },
          {
            "id": "S18",
            "status": "available"
          },
          {
            "id": "S19",
            "status": "available"
          },
          {
            "id": "S20",
            "status": "available"
          },
          {
            "type": "door"
          },
          {
            "id": "S24",
            "status": "available"
          },
          {
            "id": "S23",
            "status": "available"
          },
          {
            "id": "S22",
            "status": "available"
          },
          {
            "id": "S21",
            "status": "available"
          },
          {
            "id": "S6",
            "status": "available"
          }
        ],
        [
          {
            "id": "S2",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S7",
            "status": "available"
          }
        ],
        [
          {
            "id": "S3",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S8",
            "status": "available"
          }
        ],
        [
          {
            "id": "S4",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S9",
            "status": "available"
          }
        ],
        [
          {
            "id": "S5",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          {
            "id": "S10",
            "status": "available"
          },
          {
            "id": "S11",
            "status": "booked"
          },
          {
            "id": "S12",
            "status": "available"
          },
          {
            "id": "S13",
            "status": "booked"
          },
          {
            "id": "S14",
            "status": "available"
          },
          {
            "id": "S15",
            "status": "available"
          },
          {
            "id": "S16",
            "status": "available"
          },
          {
            "id": "S17",
            "status": "booked"
          },
          null,
          null
        ]
      ]
    },
    {
      "width": 10,
      "height": 12,
      "config": {
        "left": 5,
        "right": 4,
        "back": 8,
        "entryLeft": 4,
        "entryRight": 5
      },
      "grid": [
        [
          {
            "id": "S25",
            "status": "available"
          },
          {
            "id": "S42",
            "status": "booked"
          },
          {
            "id": "S43",
            "status": "available"
          },
          {
            "id": "S44",
            "status": "available"
          },
          {
            "type": "door"
          },
          {
            "id": "S48",
            "status": "booked"
          },
          {
            "id": "S47",
            "status": "available"
          },
          {
            "id": "S46",
            "status": "available"
          },
          {
            "id": "S45",
            "status": "available"
          },
          {
            "id": "S30",
            "status": "booked"
          }
        ],
        [
          {
            "id": "S26",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S31",
            "status": "booked"
          }
        ],
        [
          {
            "id": "S27",
            "status": "booked"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S32",
            "status": "available"
          }
        ],
        [
          {
            "id": "S28",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          {
            "id": "S33",
            "status": "booked"
          }
        ],
        [
          {
            "id": "S29",
            "status": "available"
          },
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        ],
        [
          {
            "id": "S34",
            "status": "available"
          },
          {
            "id": "S35",
            "status": "available"
          },
          {
            "id": "S36",
            "status": "booked"
          },
          {
            "id": "S37",
            "status": "available"
          },
          {
            "id": "S38",
            "status": "available"
          },
          {
            "id": "S39",
            "status": "available"
          },
          {
            "id": "S40",
            "status": "booked"
          },
          {
            "id": "S41",
            "status": "booked"
          },
          null,
          null
        ]
      ]
    }
  ]
  // From API or Room Config Component

  ngOnInit(): void {
    // Optionally: Fetch from service if not using @Input()
  }

  getGridStyle(room: any): string {
    return `repeat(${room.width}, 30px)`;
  }
}
