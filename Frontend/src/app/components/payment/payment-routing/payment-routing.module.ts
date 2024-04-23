import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PaymentComponent } from '../payment.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PaymentComponent,
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
export class PaymentRoutingModule { }
