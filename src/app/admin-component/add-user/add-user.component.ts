import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import {  FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/admin-services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { PlanService } from '../../services/admin-services/plan/plan.service';
import { InputDigitOnlyDirective } from '../../utils/directives/input-digit-only.directive';
@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule,CommonModule, InputDigitOnlyDirective],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserService, private toster:ToastrService, private libService: LibraryService, private planService :PlanService) { }

  userForm:any;
  libraryListArr:any=[]
   planAmount:Number= 0;
plansArray:{_id:String, name:String, price:Number, durationInDays: Number }[]=[]
  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      email: [''],
      address: ['', Validators.required],
      otherNo: [''],
      preferredTime: ['', Validators.required],
      planId: ['', Validators.required],
      startDate: ['', Validators.required],
      password: ['123', Validators.required],
      libraryId:['', Validators.required],
      // paymentStatus:[false, Validators.required],
      seatNo: [''],
      // payment 
      paymentMode: ['', Validators.required],
      amountPaid: ['', Validators.required],
      remainingDue: [{value:0, disabled:true}, Validators.required]
    })
 this.getAllLib();
 this.userForm.get("amountPaid")?.valueChanges.subscribe((res:number)=>{
   if(!isNaN(res)) {
      let due =  +this.planAmount - res
      if(due<0)
      {
        this.toster.error(`Paid amount can't be graater than plan amount  ₹${this.planAmount}`);
        this.userForm.get('amountPaid').setValue("");
        this.userForm.get('remainingDue').setValue("0")
      }else{

        this.userForm.get("remainingDue").setValue(due)
      }
   }else{
    this.toster.error("Entered value is not valid !");
   }
})
  }


   getAllLib()
   {
      this.libService.getAllLibrary().subscribe({
        next:(res:any)=>{
          this.libraryListArr= res.data;
        },
        error:(err:any)=>{
       this.toster.error(err.error.message)
        }
      })
        
      
   }

  getLibPlan(event:Event){
      
     let libraryId= (event.target as HTMLSelectElement).value;
     this.userForm.get('planId').setValue('');
     this.userForm.updateValueAndValidity();
     this.planService.getPlanByLibraryId(libraryId).subscribe({
      next:(res:any)=>{
      this.plansArray= res.data;
      console.log("plans array", this.plansArray);
      },
      error:(err:any)=>{
       this.toster.error(err.error.message)
      }
     })
  }

saveUser()
{
     console.log('user add form ', this.userForm.getRawValue());
     this.service.createUser(this.userForm.getRawValue()).subscribe({
      next:(res:any)=>
      {
         this.toster.success(res.message)
          console.log("saved succesfully ",res);
          this.userFormReset()
      },
      error:(err:any)=> 
      {
        console.log("error is ", err)
          this.toster.error(err.error.message)
      }
     })
}

planAmountSet(event : Event)
{
  let planId = (event.target as HTMLSelectElement).value;
   let selectedPlan= this.plansArray.find((item)=> item?._id == planId);
     this.planAmount= selectedPlan?.price || 0;

}

 userFormReset(){
  this.userForm.reset({
      name:'',
      mobileNo:'',
      email:'',
      address:'',
      otherNo:'',
      preferredTime:'',
      planId:'',
      startDate:'',
      seatNo:'',
      libraryId:''
  })
 }

}
