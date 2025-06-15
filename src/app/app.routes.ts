import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    // {path: "", redirectTo: 'sidebar',pathMatch:'full'},
    {path:'', redirectTo:'dashboard', pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent},
    {path:'user-management', loadComponent:()=> import('./user-management/user-management.component').then((c)=>c.UserManagementComponent)},
    {path:'seat-management', loadComponent:()=> import('./seat-management/seat-management.component').then((c)=>c.SeatManagementComponent)},
    {path:'left', loadChildren:()=> import('./layout/layout-routing.module').then((m)=>m.LayoutRoutingModule)},
    {path: 'sidebar', loadComponent: () => import('./layout/sidebar/sidebar.component').then(m => m.SidebarComponent)},
];
