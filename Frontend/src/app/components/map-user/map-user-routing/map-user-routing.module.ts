import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { MapUserComponent } from '../map-user.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:MapUserComponent,
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
export class MapUserRoutingModule { }
