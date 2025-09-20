
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RoomService } from '../../services/admin-services/room/room.service';
import { SeatService } from '../../services/admin-services/seat/seat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-room',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css'
})
export class AddRoomComponent implements OnInit {
constructor(private fb:FormBuilder, private roomServeice: RoomService, private seatSearvice: SeatService,
  private toster: ToastrService
){}

@Input() libraryId : String =''
seatNoChange:Subject<String>= new Subject()
roomConfigForm: any;
selectedRoomId:String="68cdac8bb2ee713ddc6f849d"


ngOnInit(): void {
this.roomConfigForm = this.fb.group({
  roomName: ['', Validators.required],
  totalSeats: [1, [Validators.required, Validators.min(1)]],
  seatLayout: this.fb.array([]), // for dynamic seat configs
  roomType: ['', Validators.required], // e.g. Study Hall, Premium, Silent Zone
  isActive: [true],
});
   this.changeSeatNo();
}

get seatLayout(): FormArray {
  return this.roomConfigForm?.get('seatLayout') as FormArray;
}

addSeat() {
  const seatGroup = this.fb.group({
    seatNo: ['', Validators.required],
  });

  this.seatLayout.push(seatGroup);
}

removeSeat(index: number) {
  this.seatLayout.removeAt(index);
}


changeSeatNo()
{
  let count=0;
   this.seatNoChange.subscribe((val:any)=>{
      let previousLeng= this.roomConfigForm?.get('seatLayout')?.controls.length;
      let newLen = val - previousLeng
      if(newLen > 1){
       
      }

   })
}

saveRoom()
{

  console.log("seat data", this.roomConfigForm.value);
  let obj = {
    libraryId : this.libraryId,
    totalSeats: this.roomConfigForm.get('totalSeats').value,
    roomName: this.roomConfigForm.get('roomName').value,
    roomType: this.roomConfigForm.get('roomType').value
  }
    this.roomServeice.saveRoom(obj).subscribe({
      next:(res:any)=>{
        this.toster.success(res.message)
        console.log("room created success", res);
      },error:(err:any)=>{
        console.log('error in createiong room ', err)
      }
    })

  // localStorage.setItem("roomData",JSON.stringify(this.roomConfigForm.value))
}

saveSeats(){

   console.log('seats are ', this.roomConfigForm.value)
   let obj={
    totalSeats: this.roomConfigForm.get('seatLayout').value,
   }
   this.seatSearvice.addSeat(obj, this.selectedRoomId).subscribe({
    next:(res:any)=>{
      this.toster.success("Success",res.message)
    console.log('seat added successfully', res)
    },
    error:(err:any)=>{
      this.toster.error("Error",err.error.message)
      console.log('error ins seat creationg ', err)
    }
   })

}

}
