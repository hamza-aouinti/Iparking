import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ListReservationsComponent } from '../listReservations.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:  ListReservationsComponent,
    data: {
      title: ''
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class  ListReservationsRoutingModule { }
