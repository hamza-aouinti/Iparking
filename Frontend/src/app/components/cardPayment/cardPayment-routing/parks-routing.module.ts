import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { CardPaymentComponent } from '../cardPayment.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CardPaymentComponent,
    data: {
      title:''
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
export class CardPaymentRoutingModule { }
