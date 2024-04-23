import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserRoutingModule } from './login-user-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginUserRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
  ]
})
export class LoginUserModule { }
