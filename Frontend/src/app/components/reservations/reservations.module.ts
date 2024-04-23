import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {ChartsModule} from 'ng2-charts';
import { ReservationsComponent } from './reservations.component';
import { ReservationsRoutingModule } from './reservations-routing/reservations-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterResPipe } from 'app/pipes/ReservPipes/filter-res.pipe';
import { FilterMatPipe } from 'app/pipes/ReservPipes/filter-mat.pipe';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FilterPlaceNamePipe } from 'app/pipes/ReservPipes/filter-place-name.pipe';
import { DateDpipePipe } from 'app/pipes/ReservPipes/date-dpipe.pipe';
import { TimeDpipePipe } from 'app/pipes/ReservPipes/time-dpipe.pipe';
import { DateFpipePipe } from 'app/pipes/ReservPipes/date-fpipe.pipe';
import { TimeFpipePipe } from 'app/pipes/ReservPipes/time-fpipe.pipe';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    ReservationsRoutingModule, ChartsModule,FormsModule,CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),

  ],
  declarations: [  ReservationsComponent,FilterResPipe,FilterMatPipe,FilterPlaceNamePipe ,  DateDpipePipe,
    TimeDpipePipe,
    DateFpipePipe,
    TimeFpipePipe, ],
  providers: []
})
export class  ReservationsModule { }
