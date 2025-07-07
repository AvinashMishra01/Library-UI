import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  userForm:any;
plans:{planId:number, planType:string, planPrice:number }[]=
   [
  {planId:1 ,planType:'Hourly', planPrice:120},
  {planId:2 ,planType:'Weekly', planPrice:320},
  {planId:3 ,planType:'Monthly', planPrice:600},
  {planId:4 ,planType:'Yearly', planPrice:1100},
  {planId:5 ,planType:'Special/Hourly', planPrice:110},
  {planId:6 ,planType:'Special/Weekly', planPrice:310},
  {planId:7 ,planType:'Special/Monthly', planPrice:590},
  {planId:8 ,planType:'Special/Yearly', planPrice:1990},
  
]
  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      email: [''],
      address: ['', Validators.required],
      otherNo: [''],
      preferedTime: ['', Validators.required],
      planType: ['', Validators.required],
      startDate: ['', Validators.required],
      seatNo: ['', Validators.required],

    })
  }



saveUser()
{
  console.log('user add form ', this.userForm);
  
}
}
