import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-library',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-library.component.html',
  styleUrl: './add-library.component.css'
})
export class AddLibraryComponent implements OnInit {

libraryFrom:any;


constructor(private fb : FormBuilder, ){}

ngOnInit() {
    this.libraryFrom= this.fb.group({
      name:['', Validators.required],
      address:['', Validators.required],

    })
}


createLibrary(){
  
}

}
