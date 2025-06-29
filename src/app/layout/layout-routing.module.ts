import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: '', redirectTo: 'footer', pathMatch: 'full'},
  {path: 'footer', component: FooterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
