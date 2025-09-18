import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-plan',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.css'
})
export class AddPlanComponent implements OnInit {

  addplanForm:any
  constructor(private fb: FormBuilder){}
 ngOnInit() {
    this.addplanForm= this.fb.group({
      planName: ['', Validators.required],
      planRate: ['', Validators.required]
    })
 }

 savePlanName()
 {
  console.log('data is ', this.addplanForm.value)
 }

}
