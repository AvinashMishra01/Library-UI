import { Routes } from '@angular/router';
import { authgaurdGuard } from './services/auth-service/authgaurd.guard';


export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'login'},
    {path:'login', loadChildren:()=> import('./authentication/authentication-routing.module').then((m)=>m.authenticationRoute )},
    { 
    path:'admin',
  
    canActivate:[authgaurdGuard],
    loadChildren:()=> import('./admin-component/admin.route').then((c)=>c.adminRoute)
  },
    { 
    path:'user',
    canActivate:[authgaurdGuard],
    loadChildren:()=> import('./user-component/user.route').then((a) => a.userRoute),
   
  },

   
    
];
