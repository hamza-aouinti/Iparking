import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'app/services/services/auth.service';
import { LicenseService } from 'app/services/services/license.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userId;
  User;
  license;
  valide:boolean;
  freeDays:Number
  details;
  licenseID;
  constructor(private authService: AuthService,public licenseService:LicenseService,@Inject(LOCAL_STORAGE) private storage: WebStorageService ,
              private router: Router) {}

  canActivate(): boolean {
                if (this.authService.loggedIn()) {
                const decodedHeader = this.storage.get('currentUser');
                this.userId=localStorage.getItem("userId")
                console.log("User identifier auth guard :" +this.userId)
                this.authService.getAdmin(this.userId.substr(1,this.userId.length-2))
                  .subscribe(
                  res => {
                  const resSTR = JSON.stringify(res);
                  const resJSON = JSON.parse(resSTR);
                  this.User=resJSON
                  console.log("User guard:" +JSON.stringify(this.User))
                  this.license=JSON.stringify(this.User[0].license);
                  console.log("Licence guard :" +this.license)
                  if (this.User[0].license === null){

                    this.storage.set('ValideLicense', false);
                    //localStorage.setItem('ValideLicense','false')

                  }
                  //if (this.license != null)
                  if (this.User[0].license!= null){
                    this.authService.getAdmin(this.userId.substr(1,this.userId.length-2))
                    .subscribe(data => {
                      const resSTR=JSON.stringify(data)
                      const resJSON=JSON.parse(resSTR)
                      this.details=resJSON;
                      console.log("Details :" +JSON.stringify(this.details))
                      this.licenseID=JSON.stringify(this.details[0].license)
                      this.licenseID=this.licenseID.substr(1,this.licenseID.length-2)
                      ////
                      this.licenseService.getLicenseByID(this.licenseID)
                      .subscribe(res => {
                        const resSTR=JSON.stringify(res);
                        const resJSON=JSON.parse(resSTR)
                        console.log("Details de la licence par id auth guard: " +JSON.stringify(resJSON))
                        console.log("Champ Valide :" +resJSON[0].Valide)
                      ////
                      this.storage.set('ValideLicense', resJSON[0].Valide);
                      });
                    });
                  }
                  });




                  ////////////////// Vérifier validité de la license gratuite /////////////
                  this.licenseService.VerifFreeLicense(this.userId.substr(1,this.userId.length-2))
                  .subscribe(dataVerif =>{
                    console.log("DataVerif Guard :" +dataVerif)
                    this.storage.set('freeLicense', dataVerif);
                  });
                  const EtatValide=this.storage.get('ValideLicense');
                  console.log("Etat valide : " +EtatValide)
                  const freeLicense = this.storage.get('freeLicense');
                  console.log("Free License " +freeLicense);
                  if (EtatValide === false){
                    if(freeLicense <= 14 ){
                      console.log("Free < 14")
                      this.storage.set('freedevice',10)

                      return true;}
                    else if(freeLicense > 14 ){
                      console.log("Free  > 14")
                      this.router.navigate(['/license']);
                      return false}
                  }
                  else  {
                    console.log("Etat valide est True")
                    return true;
                  }


                  return true;

                } ///fin if loggedIn
                else {
                  console.log('false');
                  this.router.navigate(['/welcome']);
                  return false;
                }

              }
}
