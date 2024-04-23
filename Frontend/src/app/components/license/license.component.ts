import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Inject, ViewChild, ElementRef, NgZone} from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import * as Mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { ParkService } from 'app/services/services/park.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Park } from 'app/models/park.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
import { MapParkComponent } from '../map-park/map-park.component';
import Swal from 'sweetalert2';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LicenseService } from 'app/services/services/license.service';
import { AuthService } from 'app/services/services/auth.service';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

declare var M:any;


@Component({
  selector: 'app-forms',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  public pageData;
  selected: string;
  fr = 'en';
  licenseDetails;
  NbrFreeDevices;
  Valide;
  userId;
  UserDetails;
  license;
  dateCreation;
  public freeLicenseDays;
  date;
  details;
  expired: any;
  start;
  company;
  key;
  nbdevice: any;
  licenseKey:string;
  licenseID;
  champsLicense;
  IdLicense;
  validity;
  Boolean;
  constructor(private parkS: ParkService,private router: Router,private authService:AuthService,
    private route: ActivatedRoute, private http: HttpClient, private matDialog:MatDialog,public translate:TranslateService,
    public licenseService:LicenseService,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
      translate.addLangs(['en' , 'fr' , 'ar']);
      translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.NbrFreeDevices=localStorage.getItem('freedevice')
    console.log("Number of free devices : " +this.NbrFreeDevices)
    this.Valide=localStorage.getItem('ValideLicense')
    console.log("Etat valide de la license : " +this.Valide)
    this.Boolean=this.storage.get('ValideLicense')
    console.log("Boolean : " +this.Boolean)

    this.userId=localStorage.getItem("userId")
    console.log("User identifier  :" +this.userId)
    this.authService.getAdmin(this.userId.substr(1,this.userId.length-2))
    .subscribe(
    res => {
    const resSTR = JSON.stringify(res);
    const resJSON = JSON.parse(resSTR);
    this.UserDetails=resJSON
    console.log("User :" +JSON.stringify(this.UserDetails))
    this.dateCreation=JSON.stringify(this.UserDetails[0].dateCreation);
    console.log("Date de création de cet admin :" +this.dateCreation)
    this.date=new Date(this.UserDetails[0].dateCreation)
    console.log("This date :" +this.date)
    this.date.setDate(this.date.getDate() + 14 );
    console.log("This date setting :" +this.date)


    })
    this.freeLicenseDays=this.storage.get('freeLicense')
    console.log("Free License days " +this.freeLicenseDays)
    //this.date.setDate(this.date + 14)
    //this.date=this.date+14

    this.authService.getAdmin(this.userId.substr(1,this.userId.length-2))
    .subscribe(data => {
      const resSTR=JSON.stringify(data)
      const resJSON=JSON.parse(resSTR)
      this.details=resJSON;
      console.log("Details :" +JSON.stringify(this.details))
      this.licenseID=JSON.stringify(this.details[0].license)
      this.IdLicense=JSON.stringify(this.details[0].license)
      this.licenseID=this.licenseID.substr(1,this.licenseID.length-2)
      console.log("Licence identifier :" +this.details[0].license)

      console.log("ID licence :" +this.licenseID)
      //////////
      /*if (this.IdLicense === null){
        console.log("license id null")
        this.Valide=this.storage.set('ValideLicense',false)
        this.freeLicenseDays=this.storage.get('freeLicense')


      }*/
      //if (this.IdLicense!= null){
        //else{
        this.licenseService.getLicenseByID(this.licenseID)
        .subscribe(res => {
          const resSTR=JSON.stringify(res);
          const resJSON=JSON.parse(resSTR)
          console.log("Details de la licence par id : " +JSON.stringify(resJSON))
          this.champsLicense=resJSON
          this.expired = this.champsLicense[0].expirationDate;
          this.start = this.champsLicense[0].startDate;
          this.company = this.champsLicense[0].Company;
          this.key = this.champsLicense[0].Key;
          this.nbdevice = this.champsLicense[0].nbrDevices;
          this.validity=this.champsLicense[0].Valide
        })
      //}
        //this.Valide=this.storage.set('ValideLicense',true)

        //}


      //////////

    })


  }
  ActivateLicense(){
    //console.log("Key :" +this.licenseKey)
    if(this.licenseKey != undefined){
      console.log("Key :" +this.licenseKey)
      console.log("User id:" +this.userId)
      this.licenseService.ActivateLicense(this.userId.substr(1,this.userId.length-2),this.licenseKey)
      .subscribe(data => {
        const resSTR=JSON.stringify(data)
        const resJSON=JSON.parse(resSTR)
        if(resJSON === 'Welcome To IParking'){
          alert(JSON.stringify(resJSON))
          this.storage.set('ValideLicense', true);
          location.reload();
    }
        else {
          alert(JSON.stringify(resJSON))
        }
      })

    }
  }

  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }

  }





  /*this.licenseService.getListLicense()
    .subscribe( data=>{
     const resSTR = JSON.stringify(data);
     const resJSON = JSON.parse(resSTR);
     this.licenseDetails=resJSON
     console.log("License details :" +JSON.stringify(this.licenseDetails))
  } );*/









