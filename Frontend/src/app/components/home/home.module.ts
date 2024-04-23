
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule,ReactiveFormsModule, FormControlName } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common'

import { MatNativeDateModule } from '@angular/material/core';import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    MatDatepickerModule,
    MatNativeDateModule ,

    HomeRoutingModule,
    MDBBootstrapModule.forRoot()

],
  declarations: [ HomeComponent],
  providers: [ MatDatepickerModule,
    MatNativeDateModule, DatePipe  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class HomeModule { }
