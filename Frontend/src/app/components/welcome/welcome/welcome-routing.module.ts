import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../welcome.component';
import { LoginAdminComponent } from 'app/components/login-admin/login-admin.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data :{
      title:''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
