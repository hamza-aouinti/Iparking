import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from '../accueil.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AccueilComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
