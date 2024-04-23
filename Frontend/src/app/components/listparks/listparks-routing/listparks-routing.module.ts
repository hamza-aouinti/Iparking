import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ListparksComponent } from '../listparks.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListparksComponent,
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
export class ListparksRoutingModule { }
