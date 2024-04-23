import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MapUserComponent} from './map-user.component';
import { MapUserRoutingModule } from './map-user-routing/map-user-routing.module';

@NgModule({
  imports: [
    MapUserRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIlFA3KpOdfvbXjHuUOHsiO31QNmm5LHE'
    })
  ],
  declarations: [ MapUserComponent ],
  providers: []
})
export class MapUserModule { }
