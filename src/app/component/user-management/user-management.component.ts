import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopUpComponent } from '../../shared-component/confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule,MatPaginatorModule,NgbNavModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  selctedTabMob: any;
  active: any;
  activeTabType:any;
  tabs = [
   
    {
      name: "Active User",
      path: "active-user",
      type:7
    },
    {
      name: "Inactive User",
      path: "inactive-user",
      type:9
    },
    {
      name: "Guest User",
      path: "guest-user",
      type:10
    },
    
  ];




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
      displayName : 'Activity', //4
      columnName : 'actvity',
      active: true
    },
      {
      displayName : 'Action', //5
      columnName : 'action',
      active: true
    },

]

pageSize='10';
pageIndex='0'

userList:{userData:{name:string, address:string, status:boolean, currentStatus:string}[], totalRecord:number} ={
  userData:[
  {name:'Avinash', address:'Mahuli', status:true ,currentStatus:'Log-In'},
  {name:'Avinash-1', address:'Mahuli-1', status:true , currentStatus:'Log-In'},
  {name:'Avinash-2', address:'Mahuli-2', status:true , currentStatus:'Log-In'},
  {name:'Avinash-3', address:'Mahuli-3', status:false , currentStatus:'Log-In'},
  {name:'Avinash-4', address:'Mahuli-4', status:true , currentStatus:'Log-In'},
  {name:'Avinash-5', address:'Mahuli-5', status:true , currentStatus:'Log-In'},
  {name:'Avinash-6', address:'Mahuli-6', status:false , currentStatus:'Log-In'},
  {name:'Avinash-7', address:'Mahuli-7', status:true , currentStatus:'Log-In'},
  {name:'Avinash-8', address:'Mahuli-8', status:true , currentStatus:'Log-In'},
  {name:'Avinash-9', address:'Mahuli-9', status:false , currentStatus:'Log-In'},
  {name:'Avinash-10', address:'Mahuli-10', status:true , currentStatus:'Log-In'},
  {name:'Avinash-11', address:'Mahuli-11', status:true , currentStatus:'Log-In'},
  {name:'Avinash-12', address:'Mahuli-12', status:true , currentStatus:'Log-In'},
  ],
  totalRecord:12,


}

constructor(private route :ActivatedRoute, private router: Router, private modalService: NgbModal){}

ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    const path = params.get('id'); 
    console.log("path is ", path);
   
  let find=false

  this.tabs.filter((item)=>{
    if(item.path== path){
       this.active= item.path;
       this.activeTabType= item.type
       find=true;
    }
  })
  console.log("find is ", find);
  
if(!find){
  this.router.navigate(['/admin/user-management/','active-user']);
}
//  this.getOrderList()
  });
}
changeTab(tabData:any){
  console.log('tab data', tabData)
  this.active= tabData.path;
       this.activeTabType= tabData.type;
        this.router.navigate(['/admin/user-management/', this.active]);
}

onPageChange(event:any) {

  this.pageIndex = event.pageIndex
  this.pageSize = event.pageSize
 
console.log('event ', event);

}

openConfirmation(data:any, index:number)
{
 console.log('data is ', data, index);
 
const modalRef = this.modalService.open(ConfirmationPopUpComponent, {backdrop:'static', centered:true});
  modalRef.componentInstance.confirmationMessage = {
    mainHeading:'Confirmation',
    heading: 'Status will be change!',
    message: 'Do you really want to change the status?',
    yesBtn: 'Yes',
    noBtn: 'Cancel'
  };

 modalRef.result.then(
    (result) => {
      if (result) {
        console.log('User confirmed');
        this.userList.userData[index].status= !data?.status
     console.log('data is ', this.userList)
      }
    },
    (dismissed) => {
      console.log('User cancelled');
    }
  );


}





}
