import { Routes } from '@angular/router';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { MainComponent } from './layout/main/main.component';
import { authgaurdGuard } from './services/auth-service/authgaurd.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'login'},
    {path:'login', loadChildren:()=> import('./authentication/authentication-routing.module').then((m)=>m.authenticationRoute )},
    { 
    path:'',
    component:MainComponent,
    children:[
     {path:'dashboard',canActivate:[authgaurdGuard], component:DashboardComponent},
     {path:"admin",  canActivate:[authgaurdGuard], loadChildren: () => import('./admin-component/component.route').then((a) => a.componentRoute)}
    ]
  },

   
    
];
