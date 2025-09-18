import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLoginService } from '../../services/admin-services/admin-login/admin-login.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
constructor(private fb: FormBuilder, private adminService : AdminLoginService, private router: Router){}

userLoginForm:any;

adminLoginForm:any;
adminSignUpForm:any
admin:boolean= false;
loginForm:boolean=true;

ngOnInit() {
  this.userLoginForm= this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required]
})
  this.adminSignUpForm= this.fb.group({
        name:['', Validators.required],
        email:['', Validators.required],
        password:['', Validators.required]
})
  this.adminLoginForm = this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required]
})
}

redirectTo(panel:string)
{
  this.admin = panel == 'admin'  ? true : false;
}

loginAsAdmin(){
      
  this.adminService.adminLogin(this.adminLoginForm.value).subscribe({
    next:(res:any)=>
    {
        // console.log("login resp", res)
        localStorage.setItem('token', res?.data?.token);
        localStorage.setItem("role", res?.data?.role)
        this.router.navigate(['/dashboard']);    
    },
    error:(err:any)=>
    {
      console.log('loging error ', err)
    }
  })

}


gotoSignupForm()
{
  this.loginForm=false
}

adminSignUp()
{
  //  console.log("admin signup form ", this.adminSignUpForm.value)
    this.adminService.adminSignup(this.adminSignUpForm.value).subscribe({
      next:(res:any)=>{
        console.log('res is ', res)
      }, 
      error:(err:any)=>{
        console.log('error is ', err)
      }
    })
}

}