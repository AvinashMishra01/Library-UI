import { Routes } from '@angular/router';
import { MainComponent } from '../layout/main/main.component';


export const userRoute : Routes = [
 {
    path:'',
    component: MainComponent,
    children:[
     {path:'dashboard', loadComponent:()=> import('./user-dashboard/user-dashboard.component').then((d)=>d.UserDashboardComponent) },
     {path:'change-library', loadComponent:()=> import('./change-library/change-library.component').then((cl)=>cl.ChangeLibraryComponent)}
    ]
 }
    
]






