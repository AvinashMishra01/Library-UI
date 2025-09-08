
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-roomconfiguration',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './roomconfiguration.component.html',
  styleUrl: './roomconfiguration.component.css'
})
export class RoomconfigurationComponent implements OnInit {
constructor(private fb:FormBuilder){}

seatNoChange:Subject<String>= new Subject()
roomConfigForm: any;



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
  localStorage.setItem("roomData",JSON.stringify(this.roomConfigForm.value))
}

}
