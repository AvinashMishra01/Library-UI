import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../services/common/payment/payment.service';

@Component({
  selector: 'app-payment-history',
  imports: [CommonModule, NgbPopover],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent implements OnInit {


@Input() userData!:{name:string,mobile:string,  address?:string,userId:string, subscriptions:{libraryId:string,planId:string, planName:string,lastPaidMonth:string|null, planStatus:Boolean,  dueAmount:number,planExpireOn:Date,duePayments:{paymentId:string, dueAmount:number}[]}}

paymentHistoryArray:any=[]


constructor(private activeModal : NgbActiveModal, private paymentService :PaymentService){};


ngOnInit() {
  this.getPaymentHistory();
}

getPaymentHistory()
{
  let body;
   if(this.userData){
   body= {
    userId: this.userData?.userId
   }
}
  this.paymentService.getUserPaymentHistory(body).subscribe({
    next:(res:any)=>{
      this.paymentHistoryArray= res.history
    },
    error:(err:any)=>{
     console.log("erorr in payment history", err);

  
    }
  })

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
