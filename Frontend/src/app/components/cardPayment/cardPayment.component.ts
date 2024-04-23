import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Inject, ViewChild, ElementRef, NgZone} from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import * as Mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { ParkService } from 'app/services/services/park.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/services/services/auth.service';
import { error } from 'console';

declare var M:any;


@Component({
  selector: 'app-parks',
  templateUrl: './cardPayment.component.html',
  styleUrls: ['./cardPayment.component.scss']
})
export class CardPaymentComponent implements OnInit {
  public pageData;
  collapsed = true;

  List:boolean;
  Map:boolean;
  userId:string;
  map:Mapboxgl.Map;
  popup:Mapboxgl.Popup;
  markers = {} as any;
  marker = {} as any ;
  list = {} as any;
  parking = {} as any;
  M: any;
  t = ',';
  file: any ;
  k = {};
  path;
  imagePreview: any;
  image: any;
  edits = false;
  role = '';
  selected: string;
  editss = false;
  options = {
    componentRestrictions : {
      country: ['TUN']
    }
  };
  p = [] as any;
  uploadfile: File;
  defaultvalue: string;
  Selected: string;
  fr = 'en';
  public el = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  numCard: any;
  name:any;
  montant:any;
  cin:any;
  code:any;
  compteUrl = '/api/addCompte';
  pencil:boolean;
  constructor(public auth:AuthService,private parkS: ParkService,public router: Router, private route: ActivatedRoute, private http: HttpClient, private matDialog:MatDialog, public translate: TranslateService) {
    this.parkS.listen().subscribe((m:any)=>{
      console.log(m);
    })
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
    this.userId=localStorage.getItem('userId');

  }
  addForm = new FormGroup({
    userID: new FormControl(),
    add: new FormControl(),
    numCard:new FormControl(),
    code:new FormControl(),
    montant:new FormControl(),
  });
  submitted = false;

  ngOnInit() {


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
                                                                            //****Partie Parking****//
  onSubmit(){
    //this.userId= this.userId.substr(1,this.userId.length-1)
    this.submitted=true;
    const montanttoAdd=this.addForm.get('montant').value
    if(montanttoAdd >= 10000){

    this.http.post(this.compteUrl, {
      userId:this.userId.substr(1,this.userId.length-2),
      add:this.addForm.get('add').value,
      numCard:this.addForm.get('numCard').value,
      code:this.addForm.get('code').value,
      montant:this.addForm.get('montant').value,
    })
    .subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      if(resJSON.status == 'err'){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'You have already an account !',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else
      { Swal.fire(
        'Success!',
        'Account created successfully',
        'success',);
      this.addForm.reset();
      }
    }
      /*, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'You have already an account !',
          showConfirmButton: false,
          timer: 1500,
        });
      }*/


    );}
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Add an amount > 10 dt please !',
        showConfirmButton: false,
        timer: 1500,
      });
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

    /*this.auth.addCompte(this.name,this.cin,this.numCard,this.montant)
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        if (resJSON.status === 'err') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Device ID not found',
            showConfirmButton: false,
            timer: 1500,
          });

        }
        else{
          Swal.fire(
            'Success!',
            'Added Successfully',
            'success',);
          console.log(data+"data");


        }},

        );
  }*/






}

