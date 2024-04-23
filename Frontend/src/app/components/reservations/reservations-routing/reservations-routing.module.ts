import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ReservationsComponent } from '../reservations.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ReservationsComponent,
    data: {
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
export class ReservationsRoutingModule { }
