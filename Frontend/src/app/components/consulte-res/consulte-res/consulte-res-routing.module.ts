import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsulteResComponent } from '../consulte-res.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ConsulteResComponent,
    data: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsulteResRoutingModule { }
