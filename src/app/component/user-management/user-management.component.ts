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
    // {
    //   name: "Monthly Sub",
    //   path: "monthly-subscription",
    //   type:7
    // },
    // {
    //   name: "Yearly Sub",
    //   path: "yearly-subscription",
    //   type:7
    // },
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
      displayName : 'Details', //1
      columnName : 'details',
      active: true
    },
      {
      displayName : 'Address', //2
      columnName : 'address',
      active: true
    },
  
      {
      displayName : 'Plan', //3
      columnName : 'plan',
      active: true
    },
      {
      displayName : 'Last Paid', //4
      columnName : 'lastPaidMonth',
      active: true
    },
      {
      displayName : 'Status', //5
      columnName : 'status',
      active: true
    },
      {
      displayName : 'Balance', //6
      columnName : 'balance',
      active: true
    },
      {
      displayName : 'Action', //7
      columnName : 'action',
      active: true
    },

]

pageSize='10';
pageIndex='0'

userList:{userData:{name:string,mobile:string, plan:string, address?:string,lastPaidMonth:string|null, status:string, balance?:number}[], totalRecord:number} ={
  userData:[

  { name: "Alice", mobile: "9876543211", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-05", status: "Due", balance: 50.00 },
  { name: "John", mobile: "9876543212", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid", balance: 0.00 },
  { name: "Priya", mobile: "9876543213", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: null,      status: "Due", balance: 50.00 },
  { name: "Amit", mobile: "9876543214", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-04", status: "Due", balance: 100.00 },
  { name: "Sara", mobile: "9876543215", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid", balance: 0.00 },
  { name: "Ravi", mobile: "9876543216", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-05", status: "Due", balance: 50.00 },
  { name: "Neha", mobile: "9876543217", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid", balance: 0.00 },
  { name: "Karan", mobile: "9876543218", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-03", status: "Due", balance: 150.00 },
  { name: "Divya", mobile: "9876543219", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: null,      status: "Due", balance: 50.00 },
  { name: "Mohit", mobile: "9876543220", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-05", status: "Due", balance: 50.00 },
  { name: "Tina", mobile: "9876543221", plan: "Monthly",   address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid",balance: 0.00 },
  { name: "Vikram", mobile: "9876543222", plan: "Monthly", address:'Mahuli-1',  lastPaidMonth: "2024-02", status: "Due", balance: 200.00 },
  { name: "Sneha", mobile: "9876543223", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid",balance: 0.00 },
  { name: "Rohit", mobile: "9876543224", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-05", status: "Due", balance: 50.00 },
  { name: "Anjali", mobile: "9876543225", plan: "Monthly", address:'Mahuli-1',  lastPaidMonth: null,      status: "Due", balance: 50.00 },
  { name: "Arjun", mobile: "9876543226", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid",balance: 0.00 },
  { name: "Megha", mobile: "9876543227", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-01", status: "Due", balance: 250.00 },
  { name: "Suman", mobile: "9876543228", plan: "Monthly",  address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid",balance: 0.00 },
  { name: "Deepak", mobile: "9876543229", plan: "Monthly", address:'Mahuli-1',  lastPaidMonth: "2024-05", status: "Due", balance: 50.00 },
  { name: "Ritika", mobile: "9876543230", plan: "Monthly", address:'Mahuli-1',  lastPaidMonth: "2024-06", status: "Paid",balance: 0.00 }


  ],
  totalRecord:20,


}

dummyRecord:any;

constructor(private route :ActivatedRoute, private router: Router, private modalService: NgbModal){}

ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    const path = params.get('id'); 
    console.log("path is ", path);
   
  let find=false
  this.dummyRecord= this.userList
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
  this.userList.userData = this.dummyRecord.userData.slice(+this.pageIndex, +this.pageSize)
//  this.getOrderList()
console.log('user list ',this.pageIndex, this.pageSize,this.userList.userData);

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
 this.userList.userData = this.dummyRecord.userData.slice(+this.pageIndex + +this.pageSize, 10* +this.pageIndex)
console.log('event ', event);
console.log('user list page change',this.pageIndex, this.pageSize, this.userList.userData);


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
        this.userList.userData[index].status= data?.status=="Due" ? "Paid" : "Due" 
     console.log('data is ', this.userList)
      }
    },
    (dismissed) => {
      console.log('User cancelled');
    }
  );


}





}
