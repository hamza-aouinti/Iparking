import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapRoutingModule } from './map-routing/map-routing.module';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    MapRoutingModule,CommonModule,FormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIlFA3KpOdfvbXjHuUOHsiO31QNmm5LHE'
    })
  ],
  declarations: [ MapComponent ],
  providers: []
})
export class MapModule { }
