
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RoomService } from '../../services/admin-services/room/room.service';
import { SeatService } from '../../services/admin-services/seat/seat.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-room',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css'
})
export class AddRoomComponent implements OnInit {
constructor(private fb:FormBuilder, private roomServeice: RoomService, private seatSearvice: SeatService,
  private toster: ToastrService, private modalService : NgbModal
){}
@ViewChild('addSeatModal') addSeatModal:any
@Input() libraryId : String =''
@Input() roomArray: any;
@Input() parentAccordionId!: string;

seatList:any[]=[]


seatNoChange:Subject<String>= new Subject()
seatForm: any;
selectedRoomId:String=''
 seatCount: number = 0;
  seatInputs: string[] = [];

ngOnInit(): void {
 this.seatForm = this.fb.group({
  seatCount:['', Validators.required],
  seats: this.fb.array([])
 })
}

  get seats(): FormArray {
    return this.seatForm.get('seats') as FormArray;
  }


getSeats(roomId:String)
{
  this.seatSearvice.getSeats(roomId).subscribe({
    next:(res:any)=>{
      console.log("seat list", res);
      this.seatList= res?.data
      
    },
    error:(err:any)=>{
      console.log("error in seat list", err);
      
    }
  })
}


  generateSeatInputs() {
 const count = this.seatForm.get('seatCount')?.value || 0;

    // reset seats array first
    this.seats.clear();

    for (let i = 0; i < count; i++) {
      this.seats.push(
        this.fb.group({
          name: ['', Validators.required]
        })
      );
    }
    }




saveSeats(){

    if (this.seatForm.invalid) return;
    console.log('seat form', this.seatForm, this.seatForm.invalid)
    const newSeats = this.seatForm.value.seats;
    console.log('New Seats:', newSeats);

   let obj={
    totalSeats: this.seatForm.get('seats').value,
   }
   this.seatSearvice.addSeat(obj, this.selectedRoomId).subscribe({
    next:(res:any)=>{
      this.toster.success("Success",res.message)
      this.getSeats(this.selectedRoomId);
      this.cancelSeatModal();
    console.log('seat added successfully', res)
    },
    error:(err:any)=>{
      this.toster.error("Error",err.error.message)
      console.log('error ins seat creationg ', err)
    }
   })

}


openSeatAddForm(roomId:String){
  this.modalService.open(this.addSeatModal, { backdrop:'static', centered:true})
  this.selectedRoomId=roomId;
}

cancelSeatModal(){
  this.seatForm.reset();
  this.modalService.dismissAll();

}





}
