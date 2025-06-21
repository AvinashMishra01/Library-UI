import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule,MatPaginatorModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
display_unshipped_columns =[

      {
      displayName : 'Sr. No', //1
      columnName : 'srNo',
      active: true
    },
      {
      displayName : 'Details', //2
      columnName : 'srNo',
      active: true
    },
  
      {
      displayName : 'Status', //3
      columnName : 'srNo',
      active: true
    },
      {
      displayName : 'Activity', //3
      columnName : 'actvity',
      active: true
    },

]

pageSize='10';
pageIndex='0'

userList={
  userData:[
  {name:'Avinash', address:'Mahuli', status:'Active',currentStatus:'Log-In'},
  {name:'Avinash-1', address:'Mahuli-1', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-2', address:'Mahuli-2', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-3', address:'Mahuli-3', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-4', address:'Mahuli-4', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-5', address:'Mahuli-5', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-6', address:'Mahuli-6', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-7', address:'Mahuli-7', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-8', address:'Mahuli-8', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-9', address:'Mahuli-9', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-10', address:'Mahuli-10', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-11', address:'Mahuli-11', status:'Active', currentStatus:'Log-In'},
  {name:'Avinash-12', address:'Mahuli-12', status:'Active', currentStatus:'Log-In'},
  ],
  totalRecord:12,


}

constructor(){}

ngOnInit() {
  
}


onPageChange(event:any) {

  this.pageIndex = event.pageIndex
  this.pageSize = event.pageSize
 
console.log('event ', event);

}







}
