
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AddPlaceComponent } from './add-place.component';
import { AddPlaceRoutingModule } from './add-place-routing/add-place-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    AddPlaceRoutingModule
  ],
  declarations: [ AddPlaceComponent ],
  providers: []
})
export class AddPlaceModule { }
