
import { NgModule } from '@angular/core';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing/payment-routing.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    PaymentRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,CommonModule,
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),

  ],
  declarations: [ PaymentComponent ],
  providers: []
})
export class PaymentModule { }
