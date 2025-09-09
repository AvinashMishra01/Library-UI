import { Routes } from '@angular/router';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:"admin", loadChildren: () => import('./admin-component/component.route').then((a) => a.routes)}
    
];
