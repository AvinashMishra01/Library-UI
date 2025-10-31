import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { PlanService } from '../../services/admin-services/plan/plan.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from "../../layout/layout-routing.module";
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/common/payment/payment.service';
import { InputDigitOnlyDirective } from '../../utils/directives/input-digit-only.directive';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-update-plan',
  standalone: true,
  templateUrl: './update-plan.component.html',
  styleUrl: './update-plan.component.css',
  imports: [FormsModule, CommonModule, LayoutRoutingModule, ReactiveFormsModule, InputDigitOnlyDirective],
  
})
export class UpdatePlanComponent implements OnInit {
@Input() userData! :{name:string,mobile:string,  address?:string,userId:string, subscriptions:{libraryId:string,planId:string, planName:string,lastPaidMonth:string|null, planStatus:Boolean, balance?:number, dueAmount:number,planExpireOn:string}}
@Output() modalResponce = new EventEmitter<boolean>();


  constructor(public activeModal: NgbActiveModal, private libService: LibraryService, private planService: PlanService, private fb: FormBuilder,
    private toaster: ToastrService, private paymentService: PaymentService
  ) {}
 libraryListArr:any=[];
 planListArray:any=[];
selectedPlanId:String="";
selectedPlanData:any;
selectedLibId:String="";

 paymentModal:boolean= false;
 paymentForm:any;
 
 role:string | null=""
 
 planStartDate:string='';
 planEndDate:Date= new Date();
isChangeDate:boolean=false;

ngOnInit() {
  console.log("data ins update plan ", this.userData);
  this.planStartDate= (this.userData.subscriptions.planExpireOn).split('T')[0] || (JSON.stringify(new Date())).split('T')[0]
  this.selectedLibId= this.userData?.subscriptions?.libraryId;
  this.selectedPlanId=  this.userData?.subscriptions?.planId;
  this.selectedPlanData= this.userData;
 this.role= localStorage.getItem('role');
 if(this.role=="admin")
 {
   this.getAllAdminLibrary();
 }else{
  this.getLibPlan(this.selectedLibId);
 }
  
this.paymentForm= this.fb.group({
  paymentMode: ['', Validators.required],
  amountPaid: ['', [Validators.required, Validators.min(1)]],
  remainingDue: [{value:0, disabled:true}, Validators.required]
})

this.paymentForm.get('amountPaid').valueChanges.subscribe((res:number)=>{
     if(!isNaN(res)) {

      let due =  +this.selectedPlanData?.price - res
     
      if(due<0)
      {
        this.toaster.error(`Paid amount can't be graater than plan amount  ₹${this.selectedPlanData?.price}`);
        this.paymentForm.get('amountPaid').setValue("");
        this.paymentForm.get('remainingDue').setValue("0")
      }else{

        this.paymentForm.get("remainingDue").setValue(due)
      }
   }else{
    this.toaster.error("Entered value is not valid !");
   }
})


}

getAllAdminLibrary(){
  this.libService.getAllAdminLibrary().subscribe({
    next:(res:any)=>{
      this.libraryListArr= res.data;
      console.log('library list arr', this.libraryListArr)
      this.getLibPlan(this.selectedLibId);
    },
    error:(err:any)=>{
      console.log("error while getting lib in plan update", err);
      
    }
  })
}


getLibPlan(libraryId:String= "",event?:Event, ){

  let libId;
  if(event){
    libId= (event.target as HTMLSelectElement).value;
    this.selectedPlanId= this.userData.subscriptions.planId
    this.selectedPlanData= this.userData;
  }else{
    libId=libraryId
  }
 
 console.log('Selected Library ID:', libId);
     this.planService.getPlanByLibraryId(libId).subscribe({
      next:(res:any)=>{
        console.log('lib plan ', res);
        this.planListArray= res.data;
      },
      error:(err:any)=>{
        console.log('Error in lib plan', err)
      }
     })



}


 selectPlan(data:any){
   this.selectedPlanId= data?._id;
   this.selectedPlanData= data;
   console.log("selected plan data", data);
this.planEndDate = new Date(this.planStartDate);
this.planEndDate.setDate(this.planEndDate.getDate() + this.selectedPlanData?.durationInDays);
 }



  confirm(type:string) {
  this.paymentModal = true;
   

  if(type=='pay')
  {

    if(!this.paymentForm.valid){
           this.paymentForm.markAllAsTouched();
           this.paymentForm.updateValueAndValidity(); 
           return; 
    }
    let body = {
      userId: this.userData?.userId,
      libraryId: this.selectedLibId,
      planId:this.selectedPlanData?._id,
      paymentMode:this.paymentForm.get('paymentMode').value,
      amountPaid: this.paymentForm.get('amountPaid').value,
      startDate: this.planStartDate || Date.now(),
      remainingDue:this.paymentForm.get('remainingDue').getRawValue(),
    }
    console.log("body is ", body);
    
     this.paymentService.savePayment(body).subscribe({
      next:(res:any)=>{
         this.toaster.success(res.message);
            this.modalResponce.emit(true);
            this.activeModal.close('true');
      },
      error:(err:any)=>{
        console.log('error in payment doing', err)
          this.toaster.error(err.error.message);
      }
     })
  }



  }
  cancel() {
    this.modalResponce.emit(false);
    this.activeModal.dismiss('false');
  }

  changeDate()
  {
     this.isChangeDate= !this.isChangeDate
  }

  startDateChange(newDate:string)
  {
    console.log('start date change', newDate);
    this.planEndDate = new Date(this.planStartDate);
    this.planEndDate.setDate(this.planEndDate.getDate() + this.selectedPlanData?.durationInDays);

    
  }


}
