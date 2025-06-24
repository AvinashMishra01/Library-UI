import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';


export const routes: Routes = [
  {path:'', component:UserManagementComponent},
  {path:'create-plan', loadComponent: () => import('./plan/plan.component').then((c) => c.PlanComponent)},
  {path:'seat-management', loadComponent: () => import('./seat-management/seat-management.component').then((c) => c.SeatManagementComponent)},
  {path:'room-management', loadComponent:()=> import('./roomconfiguration/roomconfiguration.component').then((c)=>c.RoomconfigurationComponent)}
];







