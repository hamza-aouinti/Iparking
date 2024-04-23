import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AddPlaceComponent } from '../add-place.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddPlaceComponent,
    data: {
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
export class AddPlaceRoutingModule { }
