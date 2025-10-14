import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal, NgbNavModule, NgbPopover, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopUpComponent } from '../../shared-component/confirmation-pop-up/confirmation-pop-up.component';
import { UserService } from '../../services/admin-services/user.service';
import { PaymentHistoryComponent } from '../../shared-component/payment-history/payment-history.component';
import { UpdatePlanComponent } from '../../shared-component/update-plan/update-plan.component';
import { ClearDueComponent } from '../../shared-component/clear-due/clear-due.component';
import { ToastrService } from 'ngx-toastr';
import { LayoutRoutingModule } from "../../layout/layout-routing.module";


@Component({
  selector: 'app-user-management',
  imports: [CommonModule, MatPaginatorModule, NgbNavModule, NgbPopover, LayoutRoutingModule], //
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit, OnDestroy {
  selctedTabMob: any;
  active: any;
  activeTabType:any;
  tabs = [
  
    {
      name: "Active User",
      path: "active-user",
      userActive: true
    },
    {
      name: "Inactive User",
      path: "inactive-user",
      userActive: false
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
    //   {
    //   displayName : 'Last Paid', //4
    //   columnName : 'lastPaidMonth',
    //   active: true
    // },
      {
      displayName : 'Payment Status', //5 ,4 
      columnName : 'status',
      active: true
    },
    //   {
    //   displayName : 'Balance', //6
    //   columnName : 'balance',
    //   active: true
    // },
      {
      displayName : 'Action', //7, 5 
      columnName : 'action',
      active: true
    },

]

pageSize='10';
pageIndex=0

userList:{userData:{name:string,mobile:string,  address?:string, totalDue:number, subscriptions:{planName:string,lastPaidMonth:string|null, planStatus:Boolean, balance?:number, dueAmount:number,planExpireOn:Date} }[], totalRecord:number} ={ userData:[], totalRecord:0
}

dummyRecord:any;

constructor(private route :ActivatedRoute, private router: Router, private modalService: NgbModal, private userService:UserService, private toaster: ToastrService){}

ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    const path = params.get('id'); 
    console.log("path is ", path);
   
  let find=false
  this.dummyRecord= this.userList
  this.tabs.filter((item)=>{
    if(item.path== path){
       this.active= item.path;
       this.activeTabType= item.userActive
       find=true;
    }
  })
  console.log("find is ", find);
  
if(!find){
  this.router.navigate(['/admin/user-management/','active-user']);
}
//   this.userList.userData = this.dummyRecord.userData.slice(+this.pageIndex, +this.pageSize)
// //  this.getOrderList()
// console.log('user list ',this.pageIndex, this.pageSize,this.userList.userData);

this.getUserList()

  });
}
changeTab(tabData:any){
  console.log('tab data', tabData)
  this.active= tabData.path;
       this.activeTabType= tabData.userActive;
       this.router.navigate(['/admin/user-management/', this.active]);

}



getUserList()
{
  let body= {
    limit: this.pageSize,
    page: this.pageIndex + 1,
    userActive: this.activeTabType
  }
    this.userService.getAllUser(body).subscribe({
      next:(res:any)=>{
        console.log("user data is like ", res);
         this.userList.userData= res.users;
         this.userList.totalRecord = res.total;
      },
      error:(err:any)=>{
       console.log("error in get user data ", err)
      }
    })
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
    mainHeading:'Confirmation ',
    heading: 'Status will be change!',
    message: `Do you really want to 
  <span class="${this.active === 'inactive-user' ? 'text-success' : 'text-danger'} fw-bold">
    ${this.active === 'inactive-user' ? 'Active' : 'Inactive'}
  </span> 
  the user?`,
    yesBtn: 'Yes',
    noBtn: 'Cancel'
  };

 modalRef.result.then(
    (result) => {
      if (result) {
        console.log('User confirmed');
        let body= {
          userId:data?.userId
        }
        this.userService.inactiveUser(body).subscribe({
          next:(res:any)=>{
        console.log('inactive user' , res)
        this.getUserList()
       this.toaster.success(res.message)
          },
          error:(err:any)=>{
            console.log('error while inactive user', err);
            
          }
        })
        console.log('data is ', this.userList)
      }
    },
    (dismissed) => {
      console.log('User cancelled');
    }
  );


}

openClearDueModal(data:any, index:number)
{
  console.log("fees modal data", data, index);
  let dueModalRef= this.modalService.open(ClearDueComponent, {size:'lg' ,backdrop:'static', centered:true,  scrollable:true });
    dueModalRef.componentInstance.userData = data
    dueModalRef.result.then((result)=>{
      console.log('message from modal', result);
      
    })
}


openUpdatePlan(data:any, i:number){
console.log("data is ", data);

 const modalRef=  this.modalService.open(UpdatePlanComponent, { size:'md' , backdrop:'static', centered:true, scrollable:true } );
 modalRef.componentInstance.userData= data

 modalRef.result.then(
    (result) => {
      if (result) {
        console.log('User confirmed');
        this.getUserList();
     console.log('data is ', this.userList)
      }
    },
    (dismissed) => {
      console.log('User cancelled');
    }
  );

}

openPaymentHitory(data:any){
 const paymentModalRef =  this.modalService.open(PaymentHistoryComponent, {backdrop:'static', centered:true, scrollable:true});
  paymentModalRef.componentInstance.userData= data


}

ngOnDestroy() {
  this.modalService.dismissAll();
}

}
