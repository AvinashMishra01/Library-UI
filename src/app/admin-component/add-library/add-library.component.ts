import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { ToastrService } from 'ngx-toastr';
import { AddRoomComponent } from '../add-room/add-room';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from '../../services/admin-services/room/room.service';

@Component({
  selector: 'app-add-library',
  imports: [CommonModule, ReactiveFormsModule,FormsModule, AddRoomComponent],
  templateUrl: './add-library.component.html',
  styleUrl: './add-library.component.css'
})
export class AddLibraryComponent implements OnInit {
@ViewChild('addLibraryModal') addLibraryModal: any
@ViewChild('addRoomModal') addRoomModal:any
libraryFrom:any;
roomConfigForm:any
selectedLibraryId: String ="";
isLibraryCreated:boolean= true;

libraryListArr:any=[];
roomListArr:any=[];
constructor(private fb : FormBuilder, private libService: LibraryService, private toster: ToastrService, 
  private modalService: NgbModal, private roomServeice: RoomService){}

ngOnInit() {
    this.libraryFrom= this.fb.group({
      name:['', Validators.required],
      address:['', Validators.required],
    })

   this.roomConfigForm = this.fb.group({
  roomName: ['', Validators.required],
  totalSeats: [1, [Validators.required, Validators.min(1)]],
  seatLayout: this.fb.array([]), // for dynamic seat configs
  roomType: ['', Validators.required], // e.g. Study Hall, Premium, Silent Zone
  isActive: [true],
});

    this.getLibraryList()
}

getLibraryList()
{
    this.libService.getAllLibrary().subscribe({
      next:(res:any)=>{
        console.log('lib list', res)
        this.libraryListArr= res?.data;
      },
      error:(err:any)=>{
        console.log('erro in lib list', err);
        this.libraryListArr=[];
      }
    })
}

createLibrary(){
  console.log("library form ", this.libraryFrom.value);
  this.libService.createLibrary(this.libraryFrom.value).subscribe({
    next:(res:any)=>
    {
      this.toster.success(res?.message)
      this.selectedLibraryId= res.data?._id
      this.isLibraryCreated=true;

      console.log("library created", res, this.selectedLibraryId);
      this.modalService.dismissAll();
      this.getLibraryList()
      
    },
    error:(err:any)=>{
      this.isLibraryCreated=false;
      console.log("error in create lib", err);
      
    }
  })

}


addNewLibrary()
{
  this.modalService.open(this.addLibraryModal, { backdrop:'static', centered:true})
}

cancelLibModal(){
  this.modalService.dismissAll();
  this.libraryFrom.reset();
}

showAllRooms(id:String, type:String='')
{
    console.log(id)
    this.selectedLibraryId= id;
   this.roomServeice.getAllRoom(this.selectedLibraryId).subscribe({
    next:(res:any)=>{
       console.log("all room get", res);
       this.roomListArr= res.data?.rooms;
       if(type=='save'){
        this.libraryListArr =  this.libraryListArr.map((item:any)=> {
        if( item?._id == this.selectedLibraryId){
          console.log("lib found", item);
          return { ...item, rooms: [...this.roomListArr] };
        }
       return item;
      }) 
       }
      
    },
    error:(err:any)=>{
   console.log("error in get all room ", err);
   
    }
   })



}

openAddRoomModal()
{
  this.modalService.open(this.addRoomModal, { backdrop:'static', centered:true })
}

cancelRoomModal()
{
  this.modalService.dismissAll();
  this.roomConfigForm.reset()
}

saveRoom()
{

  console.log("seat data", this.roomConfigForm.value);
  let obj = {
    libraryId : this.selectedLibraryId,
    totalSeats: this.roomConfigForm.get('totalSeats').value,
    name: this.roomConfigForm.get('roomName').value,
    roomType: this.roomConfigForm.get('roomType').value
  }
    this.roomServeice.saveRoom(obj).subscribe({
      next:(res:any)=>{   
          this.cancelRoomModal()
        this.toster.success(res.message)
        this.showAllRooms(this.selectedLibraryId, "save")
        console.log("room created success", res);
   
        
      },error:(err:any)=>{
        console.log('error in createiong room ', err)
      }
    })

  // localStorage.setItem("roomData",JSON.stringify(this.roomConfigForm.value))
}


}
