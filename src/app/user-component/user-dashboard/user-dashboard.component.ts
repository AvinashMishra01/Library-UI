import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDashboardService } from '../../services/user-services/user-dashboard/user-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { FormateTimePipe } from '../../utils/pipes/time-pipe/formate-time.pipe';
import { PaymentService } from '../../services/common/payment/payment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentHistoryComponent } from '../../shared-component/payment-history/payment-history.component';
import { ClearDueComponent } from '../../shared-component/clear-due/clear-due.component';
import { Router } from '@angular/router';
import { UpdatePlanComponent } from '../../shared-component/update-plan/update-plan.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormateTimePipe],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  user = {
    name: 'Akhilesh',
    activeLibrary: 'City Central Library',
    plan: 'Monthly Plan',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    dueAmount: 200,
    seatNumber: 'A12',
    timeSlot: '10:00 AM - 2:00 PM'
  };

  notifications = [
    { message: 'Your reserved seat time ends in 30 minutes', time: '10 min ago' },
    { message: 'Payment due in 2 days', time: '1 day ago' },
    { message: 'New books added in Science Section', time: '2 days ago' },
  ];


userDetails:any


  constructor(private toaster:ToastrService,private modalService:NgbModal, private dashboardService: UserDashboardService, private paymentService: PaymentService, private router: Router){}
ngOnInit() {
  this.getDashboardData();
}

goToChangeLibrary()
{
  this.router.navigateByUrl('/user/change-library')
}

getDashboardData()
{
  this.dashboardService.getUserDetails().subscribe({
    next:(res:any)=>{
  console.log("user details ", res);
    this.userDetails= res.data;

    },
    error:(err:any)=>{
      this.toaster.error(err.error.message)
      console.log('error in get user detail', err)
    }
  })
}


getPaymentHistory(){
 
  this.paymentService.getUserPaymentHistory().subscribe({
    next:(res:any)=>{
     console.log('history log is ', res)
    //  this.openPaymentHitory(res.data)
    },
    error:(err:any)=>{

    }
  })
}


async openUpdatePlan( ){
 
  const formattedUser = await this.formatedData()
 const modalRef=  this.modalService.open(UpdatePlanComponent, { size:'md' , backdrop:'static', centered:true, scrollable:true } );
 modalRef.componentInstance.userData= formattedUser

 modalRef.result.then(
    (result) => {
      if (result) {
        console.log('User confirmed');

      }
    },
    (dismissed) => {
      console.log('User cancelled');
    }
  );

}

openPaymentHitory(){
 this.modalService.open(PaymentHistoryComponent, {backdrop:'static', centered:true, scrollable:true});
}

async openClearDueModal()
{

  const formattedUser = await this.formatedData();
    let dueModalRef= this.modalService.open(ClearDueComponent, {size:'lg' ,backdrop:'static', centered:true,  scrollable:true });
      dueModalRef.componentInstance.userData= formattedUser;
      dueModalRef.result.then((result)=>{
        console.log('message from modal', result);
      })
}


async formatedData()
{
   const formattedUser = {
  name: this.userDetails.name,
  mobile: this.userDetails.mobile,
  address: this.userDetails.address,
  userId: this.userDetails.userId,
  totalDue: this.userDetails.totalDue,
  subscriptions: {
    libraryId: this.userDetails.latestSubscription?.libraryDetail?.id || "",
    planId: this.userDetails.latestSubscription?.planDetail?.id || "",
    planName: this.userDetails.latestSubscription?.planDetail?.name || "",
    libraryName:this.userDetails.latestSubscription?.libraryDetail?.name || "",
    planStatus: this.userDetails.latestSubscription?.planStatus || false,
    planExpireOn: this.userDetails.latestSubscription?.planExpireOn,
    duePayments: this.userDetails.duePayments || [],
  },
};


return formattedUser
}

ngOnDestroy() {
  this.modalService.dismissAll();
}

}
