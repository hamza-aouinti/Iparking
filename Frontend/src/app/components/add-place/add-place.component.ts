import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import * as Mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { ParkService } from 'app/services/services/park.service';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapParkComponent } from '../map-park/map-park.component';
import { Place } from 'app/models/place.model';
import { ReservationService } from 'app/services/services/reservation.service';
import { SocketService } from 'app/socket.service';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { AuthService } from 'app/services/services/auth.service';
import { LicenseService } from 'app/services/services/license.service';


declare var M: any;


@Component({
  selector: 'app-forms',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class=""></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'name',
        type: 'string',
      },
      description: {
        title: 'description',
        type: 'string',
      },
      nbrSensor: {
        title: 'Device Number',
        type: 'string',
      },
      lat: {
        title: 'coordinators (Lattitude )',
        type: 'string',
      },
      lng: {
        title: 'coordinators (Longitude)',
        type: 'string',
      },
    },
  };
  placE: Place
  userId;
  marker = [] as any;


  reserv = {} as any;
  list = {} as any;
  liste = {} as any;
  selected: string;
  t = [] as any;
  firstName = {} as any;
  placesPark;
  reserveD;
  k;
  r: string;
  listPlaces: any;
  data: any;
  Property;
  matricule;
  capteur = [];
  valid: boolean;
  tt = [] as any;
  tts = [false, true, true, false];
  place = [] as any;
  places = [] as any;
  ts = [] as any;
  parkE;
  Capteur = []
  map: Mapboxgl.Map;
  public m = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  public el = new mapboxgl.Marker();
  parkUrl = '/api/list/AllParking'
  public data1: Array<any>;
  NbrFreeDevices;
  NbrPlaces = 0;
  licenseID;
  champsLicense;
  IdLicense;
  details;
  nbrDevices;
  NNbrPlaces = 0;
  NbrPlacesAttributed = 0;
  NbrPlaces1 = 0;
  NbrPlacesAttributed1 = 0;
  placesPark1;


  constructor(private auth: ParkService, private http: HttpClient, private res: ReservationService, private router: Router, public adminS: AuthService, public licenseService: LicenseService,
    private socket: SocketService, private matDialog: MatDialog, private matDialogRef: MatDialogRef<AddPlaceComponent>) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");

    this.auth.getListPark(this.userId.substr(1, this.userId.length - 2)).subscribe((res) => {
      console.log("userId:  " + this.userId)
      console.log("res:  " + res)

      this.marker = res;
      console.log("marker: " + this.marker)

      console.log("Liste des parkings: " + JSON.stringify(this.marker))



    });
    this.NbrFreeDevices = localStorage.getItem('freedevice')
    this.auth.getAllPlaces(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.NbrPlaces = resJSON.length
        console.log("Nombre de places totales: " + this.NbrPlaces)
      })

    console.log("Number of free devices : " + this.NbrFreeDevices)
    this.placE = new Place();
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.reserv.dateE = new Date();
    let nbs = 0;
    this.place = [];
    this.res.getListReservation().subscribe((res) => {
      this.list = res;
    });
    this.socket.listen('vv').subscribe((res) => {
      console.log(res);
      this.ts.push(res);
      const kk = this.ts[(this.ts.length - 1)];
      console.log('dddddcccccdtstststssdsdsdsdsdsssssss', this.ts[(this.ts.length - 1)][0][2]);
    });
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      console.log('vvvvvvvvvvvv', this.reserv.dateE);
      if (this.selected === this.list[i].name &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime())) {
        nbs++;
        console.log('ti + nb', nbs);
        // tslint:disable-next-line:radix
        this.place.push(parseInt(this.list[i].place));
        console.log('gggg', this.place);
      }
    }
    this.showMap();
    this.http.post(this.parkUrl,
      {
      }).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.data1 = resJSON;
        this.data1.forEach(item => {

          // create the popup
          const popup = new AnimatedPopup({
            offset: 20,
            openingAnimation: {
              duration: 1000,
              easing: 'easeOutBack'
            },
            closingAnimation: {
              duration: 300,
              easing: 'easeInBack'
            }
          }).setHTML(
            '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ',
            // + 'Lignes : ' + item.lignesId.length + '</h5>',
          );
          new mapboxgl.Marker({ 'color': 'red' }).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.map);
        });

      });
    /////////
    this.adminS.getAdmin(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data)
        const resJSON = JSON.parse(resSTR)
        this.details = resJSON;
        console.log("Details :" + JSON.stringify(this.details))
        this.licenseID = JSON.stringify(this.details[0].license)
        this.IdLicense = JSON.stringify(this.details[0].license)
        this.licenseID = this.licenseID.substr(1, this.licenseID.length - 2)
        console.log("Licence identifier :" + this.details[0].license)

        console.log("ID licence :" + this.licenseID)
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
            const resSTR = JSON.stringify(res);
            const resJSON = JSON.parse(resSTR)
            console.log("Details de la licence par id : " + JSON.stringify(resJSON))
            this.champsLicense = resJSON
            this.nbrDevices = this.champsLicense[0].nbrDevices;
            console.log("Number of devices : " + this.nbrDevices)

          })
        //}
        //this.Valide=this.storage.set('ValideLicense',true)

        //}


        //////////

      })









  }

  parkData(selectedValue: string) {
    this.NbrPlacesAttributed = 0;
    if (selectedValue != '') {
      this.auth.getParkWithNameMap(selectedValue).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.placesPark1 = resJSON
        console.log("Les places du park sélectionné: " + JSON.stringify(this.placesPark1))
        this.parkE = selectedValue;
        console.log("selected value: " + selectedValue);
      });

    }
  }
  filterChanged(selectedValue: string) {
    this.auth.getParkWithNameMap(selectedValue).subscribe(data => {
      this.placesPark = data
      console.log("placePark: " + this.placesPark)
    })
    this.parkE = selectedValue;
    this.kafka();
    let nbs = 0;
    let nb = 0;
    localStorage.setItem('Property', 'etat');
    this.Property = localStorage.getItem('Property');
    // l =  this.listPlaces.filter(e => !this.place.includes(e));
    this.selected = selectedValue;
    this.tt = [] as any;
    console.log("selected value: " + selectedValue);
    // tslint:disable-next-line:prefer-for-of

    for (let i = 0; i < this.marker.length; i++) {

      if (this.selected === this.marker[i].name) {

        this.t = this.marker[i].capteur;
        console.log('AMOUNA:', this.t);
      }
    }

    for (let i = 0; i < 200; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
      console.log('vvvvvvvvvvvv', this.selected);
      if (this.marker[i].name === this.selected || this.marker[i].name.toString() + ' ' === this.selected) {
        console.log('oui');
        nb = this.marker[i].nbplace;
        console.log('nb', nb);
        console.log('nbi', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0; k < this.list.length; k++) {
          this.list[k].timeS = new Date(Number(Date.parse(this.list[k].timeS)));
          this.list[k].timeE = new Date(Number(Date.parse(this.list[k].timeE)));
          if (this.selected === this.list[k].name &&
            (this.list[k].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[k].timeE.getTime() <= this.reserv.timeE.getTime())) {
            nbs++;
            console.log('ti + nb', nbs);
            console.log('ti + nbp', this.list[k]);
            // tslint:disable-next-line:radix
            this.place.push(parseInt(this.list[k].place));
            console.log('gggg', this.place);
          }
        }
        this.t = this.marker[i].capteur;
        for (let i = 0; i < this.list.length; i++) {
          for (let j = 0; j < 100; j++) {
            if (this.list[i].place == j + 1 && this.list[i].name == this.selected) {
              this.t[j].lastt = 'orange';
              console.log('AMAL', j + 1);
            }
          }
        }
        this.t = this.marker[i].capteur;
        for (let j = 0; j < 1000 /*nb*/; j++) {
          console.log('Geg', this.t[j].firstName);
          // tslint:disable-next-line:max-line-length
          if (this.ts[(this.ts.length - 1)][0][2] === 'true' && this.ts[(this.ts.length - 1)][0][0] === this.t[j].firstName) {
            console.log('loulou', this.ts);
            this.tt.push({ first: this.ts[(this.ts.length - 1)][0][0], last: 'red' });
            this.t[j].last = 'red';
            this.t[j].gest = this.ts[(this.ts.length - 1)][0][3];

          } else if (this.ts[(this.ts.length - 1)][0][2] === 'false' && this.ts[(this.ts.length - 1)][0][0] === this.t[j].firstName) {
            console.log('how', this.ts);
            this.tt.push({ first: this.ts[(this.ts.length - 1)][0][0], last: 'green' });
            this.t[j].last = 'green';
            this.t[j].gest = this.ts[(this.ts.length - 1)][0][3];
          }
          console.log('ttttt', this.tt);

        }

      }
    }

  }

  kafka() {
    let nbs = 0;
    this.place = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      console.log('vvvvvvvvvvvv', this.reserv.dateE);
      if (this.selected === this.list[i].name &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime())) {
        nbs++;
        console.log('ti + nb', nbs);
        // tslint:disable-next-line:radix
        this.place.push(parseInt(this.list[i].place));
        console.log('gggg', this.place);
      }
    }
    localStorage.setItem('Property', 'etat');
    this.Property = localStorage.getItem('Property');
    return nbs;
  }

  ADDPlace() {
    console.log("place name: " + this.placE.name)
    console.log("place id: " + this.placE.id)
    if (localStorage.getItem('role') === 'supA') {
      console.log('Session admin')
      if (this.NbrPlaces >= this.NbrFreeDevices || this.NbrPlaces >= this.nbrDevices) {
        console.log("Supérieur")

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'You have already reached the maximum number of free devices !',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      else {
        console.log("Inférieur")
        this.auth.AddPlace(this.parkE, this.placE.name, this.userId.substr(1, this.userId.length - 2), this.placE.id, this.Longitude, this.Latitude, this.Capteur)
          .subscribe(data => {
            console.log('retur00n', data)
            const resSTR = JSON.stringify(data);
            const resJSON = JSON.parse(resSTR);
            if (resJSON.status === 'err') {
              //console.log("ResJSON status : Error" )
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Device ID not found',
                showConfirmButton: false,
                timer: 1500,
              });

            }
            else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Added Successfuly',
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(data + "data");
              this.onCloseDialog();
              this.auth.getParkWithNameMap(this.parkE)
                .subscribe(data => {
                  this.placesPark = data
                  console.log("Place du parking: " + this.placesPark);
                });
            }
          },

          );
      }
    } /// fin if role = supAdmin
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Action not allowed',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }



  stylestreet() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v11');
  }
  stylesatelite() {
    this.map.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
  }
  showMap() {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    (this.map) = new Mapboxgl.Map({
      container: 'map-mapbox2', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9.196506147691451, 33.792635314317465], // Tunisia position
      zoom: 5.5// starting zoom
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.on('click', click => {
      this.Longitude = click.lngLat.lng;
      this.Latitude = click.lngLat.lat;
      this.el.setLngLat([click.lngLat.lng, click.lngLat.lat])
        .addTo(this.map)


    });
  }


  onOpenMap() {
    let dialogRef = this.matDialog.open(MapParkComponent, {
      width: '60%',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
  }
  onCloseDialog() {
    this.matDialogRef.close(false);


  }


}















