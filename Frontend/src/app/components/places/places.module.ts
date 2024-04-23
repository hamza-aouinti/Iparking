
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesRoutingModule } from './places-routing/places-routing.module';
import { PlacesComponent } from './places.component';
import { FilterIDPipe } from 'app/pipes/filter-id.pipe';
import { FilterNamePipe } from 'app/pipes/filterName.pipe';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FilterParkPipe } from 'app/pipes/filter-park.pipe';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    PlacesRoutingModule,
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),


  ],
  declarations: [ PlacesComponent,FilterIDPipe,FilterNamePipe,FilterParkPipe ],
  providers: []

})
export class PlacesModule { }
