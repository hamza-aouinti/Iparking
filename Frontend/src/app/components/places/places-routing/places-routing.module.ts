import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from '../places.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: PlacesComponent,
    data: {
    }
  },{
    path: 'subpage',
    pathMatch: 'full',
    component: PlacesComponent,
    data: {
      title: 'Subpage Tables Works'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
