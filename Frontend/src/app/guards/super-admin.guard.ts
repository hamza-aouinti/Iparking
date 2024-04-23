import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'app/services/services/auth.service';
import { LicenseService } from 'app/services/services/license.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
userId;
User;
license;

  constructor(private auth: AuthService,
              private router: Router,
              public licenseService: LicenseService) {}




  canActivate(route: ActivatedRouteSnapshot): boolean {
            // this will be passed from the route config
            // on the data property

            if (localStorage.getItem('role') === 'supA') {

             /* this.userId=localStorage.getItem("userId")
              console.log("User identifier auth guard :" +this.userId)
              this.auth.getAdmin(this.userId.substr(1,this.userId.length-2))
              .subscribe(
              res => {
              const resSTR = JSON.stringify(res);
              const resJSON = JSON.parse(resSTR);
              this.User=resJSON
              console.log("User :" +JSON.stringify(this.User))
              this.license=JSON.stringify(this.User[0].license);
              console.log("Licence :" +this.license)
              })
              if (this.license === null){
                localStorage.setItem('ValideLicense', 'false');
                let valideLicense=localStorage.getItem('ValideLicense')
                console.log("ValideLicense" + valideLicense)
              }
              else if(this.license != null){ /// if license != null
              this.auth.getAdmin(this.userId.substr(1,this.userId.length-2))
                .subscribe(data => {
                  localStorage.setItem('ValideLicense', data.license.Valide);
                  console.log("ValideLicense " + data.license.Valide)
                })
                this.licenseService.VerifFreeLicense(this.userId.substr(1,this.userId.length-2))
                .subscribe(data2 => {
                  console.log("Différence de jours : " +data2)
                  localStorage.setItem('freeLicense', JSON.stringify(data2))
                });
                const valide=localStorage.getItem('ValideLicense');
                const freeDays=localStorage.getItem('freeLicense')
                console.log("Valide :" +valide+ " Free License :" +freeDays)
                  if(valide === 'false'){
                    if(parseInt(freeDays) < 14){
                    localStorage.setItem('freedevice', '4')
                    return true;
                  }
                  else{
                    this.router.navigate(['/license']);
                    return false;
                  }
                  } // fin if valide = false
                  else{ // if valide = true
                  console.log("Valide is true")
                  return true;
                  }

              }*/
              return true;

            }
            else {
              console.log('false');
              this.router.navigate(['/welcome']);
              return false;
            }

      }// fin canActivate


}

