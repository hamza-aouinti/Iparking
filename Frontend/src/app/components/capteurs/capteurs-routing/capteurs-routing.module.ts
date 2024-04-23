import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapteursComponent } from '../capteurs.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: CapteursComponent,
    data: {
    }
  },{
    path: 'subpage',
    pathMatch: 'full',
    component: CapteursComponent,
    data: {
      title: 'Subpage Tables Works'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapteursRoutingModule { }
