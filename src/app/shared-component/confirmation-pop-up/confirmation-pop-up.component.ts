import { Component, ElementRef, EventEmitter, Input, input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirmation-pop-up',
  imports: [],
  templateUrl: './confirmation-pop-up.component.html',
  styleUrl: './confirmation-pop-up.component.css'
})
export class ConfirmationPopUpComponent {
@Input() confirmationMessage:{mainHeading:string, heading:string, message:string, yesBtn:string, noBtn:string }= {mainHeading:'Confirmation', heading:'Status will be change', message:'Are you sure ?', yesBtn:'Yes', noBtn:'Cancel'}
@Output() modalResponce = new EventEmitter<boolean>();


  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.modalResponce.emit(true);
    this.activeModal.close('true');
  }

  cancel() {
    this.modalResponce.emit(false);
    this.activeModal.dismiss('false');
  }


}
