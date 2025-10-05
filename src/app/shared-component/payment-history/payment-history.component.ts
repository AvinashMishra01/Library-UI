import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-history',
  imports: [],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.css'
})
export class PaymentHistoryComponent {

  constructor(private activeModal : NgbActiveModal){};

  
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
