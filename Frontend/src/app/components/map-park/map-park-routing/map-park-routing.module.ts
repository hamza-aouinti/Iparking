import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MapParkComponent } from '../map-park.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MapParkComponent,
    data: {
      title: ''
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class MapParkRoutingModule { }
