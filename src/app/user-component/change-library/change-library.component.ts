import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from '../../admin-component/add-room/add-room';
import { RoomService } from '../../services/admin-services/room/room.service';

@Component({
  selector: 'app-change-library',
  imports: [CommonModule, AddRoomComponent],
  templateUrl: './change-library.component.html',
  styleUrl: './change-library.component.css'
})
export class ChangeLibraryComponent  implements OnInit {

libraryListArr:any=[];
roomListArr:any=[];
selectedLibraryId:String=''
constructor(private libraryservice :LibraryService, private roomService : RoomService){}


ngOnInit(): void {
  this.getAllLibraries();
}

getAllLibraries()
{
  let body= {
    placeName: 'Delhi'
  }
   this.libraryservice.getNearByLibrary(body).subscribe({
    next:(res:any)=>{
      console.log('neayby lib get', res);
      this.libraryListArr= res.data
    }, 
    error:(err:any)=>{
      console.log("error in nearby", err);
      
    }
   })
}



showAllRooms(id:String)
{
    console.log(id)
    this.selectedLibraryId= id;
   this.roomService.getAllRoom(this.selectedLibraryId).subscribe({
    next:(res:any)=>{
       console.log("all room get", res);
       this.roomListArr= res.data?.rooms;
    
    },
    error:(err:any)=>{
   console.log("error in get all room ", err);
   
    }
   })



}

}
