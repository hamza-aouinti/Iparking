
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListReservationsComponent } from './listReservations.component';
import { ListReservationsRoutingModule } from './listReservations-routing/listReservations-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    ListReservationsRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot()


  ],
  declarations: [  ListReservationsComponent ],
  providers: []
})
export class  ListReservationsModule { }
