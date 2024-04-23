
import { NgModule } from '@angular/core';
import { PaypalComponent } from './paypal.component';
import { PaypalRoutingModule } from './paypal-routing/paypal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PaypalRoutingModule  ],
  declarations: [PaypalComponent ],
  providers: []
})
export class PaypalModule { }
