import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryService } from '../../services/admin-services/library/library.service';
import { ToastrService } from 'ngx-toastr';
import { PlanService } from '../../services/admin-services/plan/plan.service';
import { TimeScale } from 'chart.js';
import { FormateDatePipe } from "../../utils/pipes/formate-date.pipe";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopUpComponent } from '../../shared-component/confirmation-pop-up/confirmation-pop-up.component';


@Component({
  selector: 'app-add-plan',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FormateDatePipe],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.css'
})
export class AddPlanComponent implements OnInit {

  addplanForm:any
  libraryListArr:any=[]
  associatedPlan: any= [];
 isUpdate:boolean= false;
 updateData:any=""
 updateIndex:number=-1;
  constructor(private fb: FormBuilder, 
    private planService: PlanService,
    private libService: LibraryService,
    private modalService: NgbModal,
    private toaster: ToastrService){}

plan_columns =[

      {
      displayName : 'Plan Name', //1
      columnName : 'planName',
      active: true
    },
      {
      displayName : 'Price', //2
      columnName : 'price',
      active: true
    },
  
      {
      displayName : 'Description', //3
      columnName : 'description',
      active: true
    },
      {
      displayName : 'Status', //3
      columnName : 'status',
      active: true
    },

      {
      displayName : 'Created At', //5 ,4 
      columnName : 'createdAt',
      active: true
    },
      {
      displayName : 'Updated At', //6
      columnName : 'updatedAt',
      active: true
    },
      {
      displayName : 'Action', //7, 5 
      columnName : 'action',
      active: true
    },

]




 ngOnInit() {
  // name, description, price, library
  this.addplanForm= this.fb.group({
      libraryId: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],

    })


this.getLibraryList();


 }



 savePlanName()
 {
  console.log('data is ', this.addplanForm.value)
  if(!this.addplanForm.invalid){

    this.planService.savePlan(this.addplanForm.value).subscribe({
      next:(res:any)=>{
        this.toaster.success(res?.message);
        this.associatedPlan.push(res.data)
       this.resetForm();
      },
      error:(err:any)=>{
        console.log('error in plan save ', err);
        this.toaster.error(err.error?.message)
                
        

      }
    })
  }else{
    this.toaster.error('Please fill all required fields!');
  }
 }


getLibraryList()
{
  this.libService.getAllLibrary().subscribe({
    next:(res:any)=>{
      this.libraryListArr= res.data;
  
    },
    error:(err:any)=>{
      console.log('in plan lib list error', err)
    }
  })
}

getLibPlan(event: Event)
{
  let libraryId= (event.target as HTMLSelectElement).value;
 console.log('Selected Library ID:', libraryId);
     this.planService.getPlanByLibraryId(libraryId).subscribe({
      next:(res:any)=>{
        console.log('lib plan ', res);
        this.associatedPlan= res.data;
      },
      error:(err:any)=>{
        console.log('Error in lib plan', err)
      }
     })
}

// update form 
updatePlan(data:any, index:number)
{
  this.isUpdate=true;
  this.updateIndex= index
  this.updateData= data;
   this.addplanForm.patchValue(data)
}

saveUpdatePlan()
{
  this.planService.updatePlan(this.addplanForm.value, this.updateData?._id).subscribe({
    next:(res:any)=>{
      console.log('update plan res', res)
       this.associatedPlan.splice(this.updateIndex, 1)
       this.associatedPlan.unshift(res?.data);
         this.toaster.success(res?.message);
    },
    error:(err:any)=>{
      console.log('Error on the plan update', err)
    }
  })
}


openConfirmation(data:any, index:number, type:string)
{
 console.log('data is ', data, index);
  this.updateData= data;
  this.updateIndex= index
const modalRef = this.modalService.open(ConfirmationPopUpComponent, {backdrop:'static', centered:true});
  modalRef.componentInstance.confirmationMessage = {
    mainHeading:'Confirmation',
    heading: type=='update' ?  'Status will be change!' : 'Plan will be delete!',
    message: type=='update' ?'Do you really want to change the status?' :'Do you really want to delete this plan?' ,
    yesBtn: 'Yes',
    noBtn: 'Cancel'
  };

 modalRef.result.then(
    (result) => {
      if (result) {
        console.log('User confirmed');

        // this.associatedPlan[index].isActive= data?.isActive=="1" ? "0" : "1" 
        if(type=='update')
        {

          this.updatePlanStatus()
        }else{
          this.deletePlan()
        }
        console.log('data is ', this.associatedPlan)
      }
    },
    (dismissed) => {
      console.log('User cancelled', dismissed);
      this.updateData=null;
      this.updateIndex=-1;
    }
  );


}

updatePlanStatus()
{
  let body= {

    isActive : this.associatedPlan[this.updateIndex]?.isActive =='1' ? '0' : '1'
  }
  let planId = this.updateData?._id

  this.planService.updatePlanStatus(body, planId ).subscribe({
    next:(res:any)=>{
      console.log('plan status update',res )
      this.toaster.success(res.message);
       this.associatedPlan.splice(this.updateIndex,1)

      this.associatedPlan.unshift(res?.data);
       
    },
    error:(err:any)=>{
      console.log("plan status not update", err);
      this.toaster.error(err.error.message);
    }
  })
}

deletePlan()
{
  let planId= this.updateData?._id;
   this.planService.deleteplan(planId).subscribe({
    next:(res:any)=>{
      this.toaster.success(res.message);


  this.associatedPlan.splice(this.updateIndex,1)
      console.log('after delete', this.associatedPlan);
      
    },
    error:(err:any)=>{
      this.toaster.error(err.error.message);
    }
   })
}

resetForm()
{
    this.addplanForm.reset({
                   name: '',
                   price: '',
                   libraryId: '',
                   description: ''
                 });
}

}
