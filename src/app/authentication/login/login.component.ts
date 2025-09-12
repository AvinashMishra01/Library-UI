import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
constructor(private fb: FormBuilder){}

loginForm:any;
admin:boolean= false;

ngOnInit() {
  this.loginForm= this.fb.group({
        email:['', Validators.required],
        password:['', Validators.required]
})
}

redirectTo(panel:string)
{
  this.admin = panel == 'admin'  ? true : false;
}



}
