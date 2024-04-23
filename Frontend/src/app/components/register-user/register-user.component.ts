import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerUserData =  {} as any;
  listUser =  {} as any;
  valid = false;
  length = false;
  selected: string;
  fr = 'en';
  constructor(private auth: AuthService, private router: Router,public translate:TranslateService) {
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
  notValid() {
    console.log('password length', this.registerUserData.password.length);
    if (this.registerUserData.password.length < 8) {
      this.length = true;
    } else {
      this.length = false;
    }
  }
  registerUser() {
    this.notValid();
    const f = this.listUser.find(b => this.registerUserData.email === b.email);
    // tslint:disable-next-line:prefer-for-of
    if (f != null ) {
        console.log('Email valide');
        this.valid = true;
      } else {
        this.valid = false;
        if ( this.registerUserData.email || this.registerUserData.password || this.length === true ) {
          this.auth.registerUser(this.registerUserData)
          .subscribe(
            res => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'You are registred successfully ',
                showConfirmButton: false,
                timer: 1300,
              });
              this.router.navigate(['/loginuser']);
            },
            err => console.log(err)
          );
        }

    }




  }

}
