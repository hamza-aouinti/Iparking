import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterAdminComponent } from '../register-admin.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RegisterAdminComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAdminRoutingModule { }
