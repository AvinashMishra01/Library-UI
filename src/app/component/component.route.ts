import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';


export const routes: Routes = [
  {path:'', component:UserManagementComponent},
  {path:'seat-management', loadComponent: () => import('./seat-management/seat-management.component').then((c) => c.SeatManagementComponent)}
];







