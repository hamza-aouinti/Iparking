import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ParkService } from 'app/services/services/park.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  fr = 'en';
  selected: string;

  constructor(private auth: ParkService,private router: Router, public translate: TranslateService,private http: HttpClient,private matDialog:MatDialog) { 
      translate.addLangs(['en', 'fr', 'ar']);
      translate.setDefaultLang('en');

    }

  ngOnInit() {
  }
/////////  *************** Changement de langues ************ /////////
LanguageChanged(selectedValue: string) {
  localStorage.removeItem('lng');
  this.selected = selectedValue;
  this.translate.use(this.selected);
  console.log(this.selected);
  console.log(selectedValue);
  localStorage.setItem('lng', this.selected);
}
}
