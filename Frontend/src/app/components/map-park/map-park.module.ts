import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapParkComponent } from './map-park.component';
import { MapRoutingModule } from '../map/map-routing/map-routing.module';

@NgModule({
  imports: [
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIlFA3KpOdfvbXjHuUOHsiO31QNmm5LHE'
    })
  ],
  declarations: [ MapParkComponent ],
  providers: []
})
export class MapParkModule { }
