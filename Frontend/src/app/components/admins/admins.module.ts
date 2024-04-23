
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminsRoutingModule } from './admins-routing/admins-routing.module';
import { AdminsComponent } from './admins.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    AdminsRoutingModule,
    FormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ],
  declarations: [ AdminsComponent ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminsModule { }
