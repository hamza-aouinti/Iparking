
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListparksComponent } from './listparks.component';
import { ListparksRoutingModule } from './listparks-routing/listparks-routing.module';
import { PipesModule } from 'pipes-module';
import { FilterparkIDPipe } from 'app/pipes/filterpark-id.pipe';
import { FilterparkNamePipe } from 'app/pipes/filterpark-name.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    ListparksRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  declarations: [ListparksComponent,FilterparkIDPipe,FilterparkNamePipe],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]


})
export class ListparksModule { }
