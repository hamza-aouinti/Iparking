import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LicenseComponent } from '../license.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LicenseComponent,
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
export class LicenseRoutingModule { }
