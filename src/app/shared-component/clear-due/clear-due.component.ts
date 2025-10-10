import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/common/payment/payment.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationPopUpComponent } from '../confirmation-pop-up/confirmation-pop-up.component';

@Component({
  selector: 'app-clear-due',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './clear-due.component.html',
  styleUrl: './clear-due.component.css'
})
export class ClearDueComponent implements OnInit {

@Input() userData!:{name:string,mobile:string,  address?:string,userId:string, subscriptions:{libraryId:string,planId:string, planName:string,lastPaidMonth:string|null, planStatus:Boolean,  dueAmount:number,planExpireOn:Date,duePayments:{paymentId:string, dueAmount:number}[]}}

  constructor(private paymentService: PaymentService ,private activeModal : NgbActiveModal, private toaster: ToastrService, private modalService: NgbModal, private fb: FormBuilder){}
paymentIds:string[]=[];
dueHistoryArray!:{amountPaid:number, dueAmount:number,startDate:Date, endDate:Date,library:{name:string, address:string},paymentDate:Date, paymentId:string, paymentMode:string, paymentStatus:boolean,plan:{name:string,durationInDays:number, price:number} }[]
isHistoryOpen:boolean=false;
paymentForm : any;
selectedDuePay:any;
allDueSelected:boolean=false
ngOnInit() {
}

payAllDues()
{
   this.getAllPaymentsIds();
   this.allDueSelected=true
   console.log('all payments ids',this.paymentIds );
   
}

showHistory(){
  console.log("history click", this.userData);
  if(this.isHistoryOpen)
  {
    this.isHistoryOpen=false;
    return;
  }
this.getAllPaymentsIds();

if(this.paymentIds.length==0)
 {
  this.toaster.error("No due available");
  return;
 }
 let body= {
  paymentIds:this.paymentIds
 }
   
  this.paymentService.getUserDueHistory(body).subscribe({
    next:(res:any)=>{
   console.log('paymenr due history', res)
   this.isHistoryOpen= true;
   this.dueHistoryArray= res?.dueHistory
    },
    error:(err:any)=>{
      this.isHistoryOpen=false
     console.log('payment due history error', err)
    }
  })

}

getAllPaymentsIds()
{
  this.paymentIds= this.userData.subscriptions.duePayments.map((item)=> item.paymentId)
}

payDueOptionOpen(data?:any){
this.selectedDuePay= data;
this.paymentIds=[];
 this.paymentIds.push(data?.paymentId)
}


payDueConfOpen(event:Event,data?:any, index?:number ){
 console.log("pay due confirmation ", data, index);
 let paymentMode= ((event.target as HTMLSelectElement).value).toUpperCase()
 const modalRef = this.modalService.open(ConfirmationPopUpComponent, {backdrop:'static', centered:true});
   modalRef.componentInstance.confirmationMessage = {
     mainHeading:`Confirmation`,
     heading: `Due will be clear with <span class="text-success">${paymentMode}</span>`,
     message: 'Do you really want to clear the due?',
     yesBtn: 'Yes',
     noBtn: 'Cancel'
   };
 
  modalRef.result.then(
     (result) => {
       if (result) {
         console.log('User confirmed');
         if(this.allDueSelected)
         {
          this.userData.subscriptions.duePayments=[];
          this.userData.subscriptions.dueAmount=0
            console.log('all dues are cleared', this.paymentIds, this.userData?.userId);
            
         }

         this.clearDuePayment()
       }
     },
     (dismissed) => {
       console.log('User cancelled');
     }
   );
}

clearDuePayment(){
  let body= {
    userId: this.userData?.userId,
    paymentIds: this.paymentIds
  }

  this.paymentService.clearUserDueAmount(body).subscribe({
    next:(res:any)=>{
      this.toaster.success(res.message);
      if(this.allDueSelected)
      {
        this.confirm()
      }else{
        
        this.deleteClearedDueData()
      }
    },
    error:(err:any)=>{
      
    }
  })
}





 deleteClearedDueData()
 {
   this.dueHistoryArray=  this.dueHistoryArray.filter((item)=>item.paymentId != this.selectedDuePay.paymentId)
   this.userData.subscriptions.duePayments= this.userData.subscriptions.duePayments.filter((item)=>item.paymentId != this.selectedDuePay.paymentId);
   this.userData.subscriptions.dueAmount -= this.selectedDuePay.dueAmount

   if(this.dueHistoryArray.length==0)
   {
    this.confirm()
   }
 }







     confirm()
     {
      console.log('confirm click');
      this.activeModal.close('true')
     }

     cancel()
     {
      console.log('cancelc click');
      this.activeModal.close('false')
     }





}
