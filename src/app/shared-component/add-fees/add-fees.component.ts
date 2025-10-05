import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-fees',
  imports: [],
  templateUrl: './add-fees.component.html',
  styleUrl: './add-fees.component.css'
})


export class AddFeesComponent {

@Input() userData : {name:string,mobile:string, dueAmount?:number} = 
     {name: '', mobile:'', dueAmount:0}

  constructor(private activeModal : NgbActiveModal){}

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
