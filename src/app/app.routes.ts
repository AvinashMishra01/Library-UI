import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:"admin", loadChildren: () => import('./component/component.route').then((a) => a.routes)}
    
];
