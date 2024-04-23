
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CapteursComponent } from './capteurs.component';
import { FilterIDPipe } from 'app/pipes/filter-id.pipe';
import { FilterNamePipe } from 'app/pipes/filterName.pipe';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FilterParkPipe } from 'app/pipes/filter-park.pipe';
import { ChartsModule } from 'ng2-charts';

import { CapteursRoutingModule } from './capteurs-routing/capteurs-routing.module';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CapteursRoutingModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),


  ],
  declarations: [CapteursComponent ],
  providers: []

})
export class CapteursModule { }
