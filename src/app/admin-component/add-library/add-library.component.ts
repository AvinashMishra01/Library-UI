import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { ToastrService } from 'ngx-toastr';
import { AddRoomComponent } from '../add-room/add-room';

@Component({
  selector: 'app-add-library',
  imports: [CommonModule, ReactiveFormsModule,FormsModule, AddRoomComponent],
  templateUrl: './add-library.component.html',
  styleUrl: './add-library.component.css'
})
export class AddLibraryComponent implements OnInit {

libraryFrom:any;
selectedLibraryId: String ="68cc4b1eb0a4c9fe45c4e35c";
isLibraryCreated:boolean= true;

constructor(private fb : FormBuilder, private libService: LibraryService, private toster: ToastrService){}

ngOnInit() {
    this.libraryFrom= this.fb.group({
      name:['', Validators.required],
      address:['', Validators.required],

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
      
    },
    error:(err:any)=>{
      this.isLibraryCreated=false;
      console.log("error in create lib", err);
      
    }
  })

}

}
