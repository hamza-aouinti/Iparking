import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {User} from 'app/models/user'
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { LicenseService } from 'app/services/services/license.service';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  selected: string;
  fr = 'en';
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
  data;
  role;
  email;
  license;
  userId;
  User;
  LICENSE;
  userIdentifier;
  constructor(private auth: AuthService, private router: Router,private licenseService:LicenseService,
    private http:HttpClient,public translate: TranslateService,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
   }


  ngOnInit(): void {

    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });


  }

  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }

  loginUser() {
    this.userIdentifier = localStorage.getItem('userId');
  
    if (this.userIdentifier !== null && this.userIdentifier !== undefined) {
      this.userIdentifier = this.userIdentifier.substr(1, this.userIdentifier.length - 2);
      console.log("Admin identifier :" + this.userIdentifier);
    } else {
      // Handle the case where 'userId' is null or undefined
      console.error("'userId' is null or undefined");
    }
  
    console.log("testLogin");
    this.http.post("/api/list/curentUser", { email: this.loginUserData.email }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
  
      console.log('curentUser: ' +  JSON.stringify(resJSON[0]._id))
      localStorage.setItem('userId',  JSON.stringify(resJSON[0]._id));
      localStorage.setItem('admin',  "true");
      this.userId = JSON.stringify(resJSON[0]._id)
      console.log("UserId :" + this.userId)
  
    });
  
    this.auth.loginSUP(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'superviseur');
        localStorage.setItem('roles', JSON.stringify(res));
        localStorage.setItem('role', 'sup');
        this.router.navigate(['/dashboard']);
        this.incorrect = false;
      },
      err => console.log(err)
    );
  
    this.auth.loginAdmin(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'admin');
        localStorage.setItem('roles', JSON.stringify(res));
        console.log("eeee",res);
        localStorage.setItem('role', 'admin');
        this.router.navigate(['/dashboard']);
        this.incorrect = false;
      },
      err => console.log(err)
    );
  
    this.auth.loginSUPA(this.loginUserData).subscribe(res => {
      const resSTR = JSON.stringify(res);
      const resJSON = JSON.parse(resSTR);
      localStorage.setItem('token', res.token);
      localStorage.setItem('name', this.loginUserData.email);
      localStorage.setItem('role', 'supA');
      this.storage.set('currentUser',  this.loginUserData);
  
      this.role = localStorage.getItem('role');
      this.email = localStorage.getItem('name');
  
      if (resJSON.status === 'success') {
        console.log("Mail login :" + this.email)
        console.log("Role login :" + this.role)
        this.auth.getAdmin(this.userId.substr(1, this.userId.length - 2)).subscribe(
          res => {
            const resSTR = JSON.stringify(res);
            const resJSON = JSON.parse(resSTR);
            this.User = resJSON
            console.log("User Login:" + JSON.stringify(this.User))
            this.license = JSON.stringify(this.User[0].license);
            this.license = this.license.substr(1, this.license.length - 2)
  
            console.log("Licence Login:" + this.license)
            this.licenseService.getLicenseByID(this.license).subscribe(
              res => {
                const resSTR = JSON.stringify(res);
                const resJSON = JSON.parse(resSTR);
                console.log("License par admin id :" + JSON.stringify(resJSON))
                this.LICENSE = resJSON
              }
            );
  
            this.licenseService.VerifValidity(this.license).subscribe(data => {
              console.log("Data verify Login: " + data);
              //this.storage.set('ValideLicense', resJSON[0].Valide);
            });
            Swal.fire({
              position: 'center',
              width: '20%',
              icon: 'success',
              title: 'You are logged in successfully ',
              showConfirmButton: false,
              timer: 1300,
            });
            this.router.navigate(['/dashboard']);
            this.incorrect = false;
          },
          err => console.log(err)
        );
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Please check your Informations !',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
  
}
