import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan',
  imports: [ReactiveFormsModule,CommonModule,MatPaginatorModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent implements OnInit {

constructor(private fb: FormBuilder, private toaster: ToastrService){}
addPlanForm: any;
planTypeArr: {name: string, value: string}[] = [
  {name: "Hourly", value:'hourly'},
  {name:"Weekly", value:'week'},
  {name:"Monthly", value:'month'},
  {name:"Yearly", value:'year'},

]
display_unshipped_columns =[

        {
        displayName : 'Plan Type', //1
        columnName : 'planType',
        active: true
      },
      {
      displayName : 'Rate', //2
      columnName : 'rate',
      active: true
     },
      {
      displayName : 'Status', //3
      columnName : 'status',
      active: true
    },
      {
      displayName : 'Action', //4
      columnName : 'action',
      active: true
    },

]
pageSize='10';
pageIndex='0'

 planList : {
   lists:{planType:String, planPrice:number|string, status:boolean}[];
   totalRecord:string|number
} = 
  {
   lists: [
  {planType:'Hourly', planPrice:120, status:true},
  {planType:'Weekly', planPrice:320, status:true},
  {planType:'Monthly', planPrice:600, status:false},
  {planType:'Yearly', planPrice:1100, status:true},
  {planType:'Special/Hourly', planPrice:110, status:true},
  {planType:'Special/Weekly', planPrice:310, status:false},
  {planType:'Special/Monthly', planPrice:590, status:true},
  {planType:'Special/Yearly', planPrice:1990, status:false},
  
],
totalRecord:100
}

ngOnInit()
{

  this.addPlanForm= this.fb.group({
     "planType":['', Validators.required],
     "planRate":['', Validators.required],
      
  })

}

onPageChange(event:any) {

  this.pageIndex = event.pageIndex
  this.pageSize = event.pageSize
 
console.log('event ', event);

}

savePlan()
{
 this.toaster.success('Avinash Its me ')
}


}
