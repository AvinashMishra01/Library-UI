import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authenticationRoute: Routes = [
  {
    path:'', component:LoginComponent
  }
];

