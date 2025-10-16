import { Routes } from '@angular/router';
import { MainComponent } from '../layout/main/main.component';
export const adminRoute: Routes = [
   
  {
    path:'',
      component:MainComponent,
  children:[
  {path: "dashboard", loadComponent:()=> import('./dashboard/dashboard.component').then((c)=>c.DashboardComponent)},
  {path:'user-management', redirectTo:'user-management/active-user', pathMatch:'full'},
  {path:'user-management/:id', loadComponent:()=>import('./user-management/user-management.component').then((c)=>c.UserManagementComponent)},
  {path:'create-plan', loadComponent: () => import('./plan/plan.component').then((c) => c.PlanComponent)},
 
  // add library 
  {path:'create-library', loadComponent:()=>import('./add-library/add-library.component').then((c)=>c.AddLibraryComponent)  },
 
  {path:'seat-management', loadComponent: () => import('./seat-management/seat-management.component').then((c) => c.SeatManagementComponent)},
  // {path:'room-management', loadComponent:()=> import('./add-room/add-room').then((c)=>c.AddRoomComponent)},
  {path:'add-user', loadComponent:()=> import('./add-user/add-user.component').then((c)=>c.AddUserComponent)},
  {path:'add-plan', loadComponent:()=>import('./add-plan/add-plan.component').then((c)=>c.AddPlanComponent) }
]}
];







