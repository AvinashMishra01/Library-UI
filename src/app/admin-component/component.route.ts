import { Routes } from '@angular/router';
export const componentRoute: Routes = [

  {path:'user-management', redirectTo:'user-management/active-user', pathMatch:'full'},
  {path:'create-plan', loadComponent: () => import('./plan/plan.component').then((c) => c.PlanComponent)},
  {path:'user-management/:id', loadComponent:()=>import('./user-management/user-management.component').then((c)=>c.UserManagementComponent)},
 
  // add library 
  {path:'create-library', loadComponent:()=>import('./add-library/add-library.component').then((c)=>c.AddLibraryComponent)  },
 
  {path:'seat-management', loadComponent: () => import('./seat-management/seat-management.component').then((c) => c.SeatManagementComponent)},
  // {path:'room-management', loadComponent:()=> import('./add-room/add-room').then((c)=>c.AddRoomComponent)},
  {path:'add-user', loadComponent:()=> import('./add-user/add-user.component').then((c)=>c.AddUserComponent)},
  {path:'add-plan', loadComponent:()=>import('./add-plan/add-plan.component').then((c)=>c.AddPlanComponent) }
];







