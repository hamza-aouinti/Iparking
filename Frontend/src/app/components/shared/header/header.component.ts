import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selected: string;
  fr = 'en';
  user: any ;
  b: any;
  collapsed = true;
  admin:string="false";
  constructor(public auth: AuthService,  private router: Router,public translate:TranslateService) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.admin= localStorage.getItem('admin')
    console.log("admin is: "+this.admin)

    this.auth.loginUser(this.user);
    this.auth.loggedIn();
  }
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('typeCar');
    localStorage.removeItem('idPlace');
    localStorage.removeItem('lng');
    localStorage.removeItem('Property');
    localStorage.removeItem('roles');
    localStorage.removeItem('role');
    localStorage.removeItem('p');
    localStorage.setItem('matricule' , '');

    this.router.navigate(['/welcome']);

  }
  c() {
    if ( localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'supA' || localStorage.getItem('role') === 'sup' ) {
      return true;
    } else {
      return false;
    }
  }
  matricule() {
    if ( localStorage.getItem('matricule') !== '' ) {
      return true;
    } else {
      return false;
    }
  }
  filterChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }

}
