import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from '../login-user.component';


const routes: Routes = [
{
  path: '',
  pathMatch: 'full',
  component: LoginUserComponent,
  data: {
    title: ''
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUserRoutingModule { }
