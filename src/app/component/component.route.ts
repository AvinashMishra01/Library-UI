import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';


export const routes: Routes = [
  {path:'user-management', redirectTo:'user-management/active-user', pathMatch:'full'},
  {path:'create-plan', loadComponent: () => import('./plan/plan.component').then((c) => c.PlanComponent)},
  {path:'user-management/:id', loadComponent:()=>import('./user-management/user-management.component').then((c)=>c.UserManagementComponent)},
  {path:'seat-management', loadComponent: () => import('./seat-management/seat-management.component').then((c) => c.SeatManagementComponent)},
  {path:'room-management', loadComponent:()=> import('./roomconfiguration/roomconfiguration.component').then((c)=>c.RoomconfigurationComponent)},
  {path:'add-user', loadComponent:()=> import('./add-user/add-user.component').then((c)=>c.AddUserComponent)},
];







