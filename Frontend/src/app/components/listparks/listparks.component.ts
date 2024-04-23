import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import * as Mapboxgl from 'mapbox-gl';
import { ParkService } from 'app/services/services/park.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
declare var M: any;
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { MapParkComponent } from '../map-park/map-park.component';
import { TranslateService } from '@ngx-translate/core';
import { PriceService } from 'app/services/services/price.service';
@Component({
  selector: 'app-listparks',
  templateUrl: './listparks.component.html',
  styleUrls: ['./listparks.component.scss']
})
export class ListparksComponent implements OnInit {
  public pageData;
  private Latitude: number;
  private Longitude: number;

  private Description: number;
  public el = new mapboxgl.Marker();
  userId;
  List: boolean;
  Map: boolean;
  map: Mapboxgl.Map;
  //mapPark:Mapboxgl.Map;
  mapPark: Mapboxgl.Map;
  Marker = new mapboxgl.Marker();
  popup: Mapboxgl.Popup;
  listParks = {} as any;
  marker = {} as any;
  list = {} as any;
  parking = {} as any;
  M: any;
  t = ',';
  file: any;
  k = {};
  path;
  imagePreview: any;
  image: any;
  edits = false;
  role = '';
  selected: string;
  editss = false;
  options = { componentRestrictions: { country: ['TUN'] } };
  p = [] as any;

  searchName: string = "";
  searchID: string = "";
  public data1: Array<any>;
  public test;
  private data2: Array<any>;
  public test2;
  private data3: Array<any>;
  public test3;
  private l: Array<any>;
  private dev: Array<any>;
  parkingUrl = '/api/list/listParkingwithId'
  parkUrl = '/api/list/AllParking'
  priceUrl = '/api/addPrice'
  //parkingUrl:'http://localhost:3006/api/list/parking/'
  addParkUrl = '/api/addParking'
  Selected: string;
  fr = 'en';
  @ViewChild('mapElement') mapElement: ElementRef;
  selectedOption: any;
  TypeValidateSelectError: boolean;
  price: any;
  constructor(private auth: ParkService, private router: Router, public translate: TranslateService,
    private route: ActivatedRoute, private http: HttpClient, private matDialog: MatDialog, private priceService: PriceService) {
    this.auth.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    })
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    console.log("Admin Id is " + this.userId)
    this.role = localStorage.getItem('role');
    if (localStorage.length === 0) {
      window.location.replace('login');
    }
    this.refreshList();
    this.showMap();
    this.AddMap();
    /*this.auth.getListPark(this.userId).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data1 = resJSON ;
      this.data1.forEach(item => {

        // create the popup
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ',
         // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'red'}).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.mapPark);
      });

    });*/
    /*this.http.post(this.parkUrl,
      {
      }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data1 = resJSON ;
      this.data1.forEach(item => {

        // create the popup
        const popup = new AnimatedPopup({
          offset: 20,
          openingAnimation: {
            duration: 1000,
            easing: 'easeOutBack'},
          closingAnimation: {
            duration: 300,
            easing: 'easeInBack'}}).setHTML(
          '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ',
         // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'red'}).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.mapPark);
      });

    });*/

  }
  //****Partie Parking****//

  TypeValidateSelect(value) {
    if (value == "default") {
      this.TypeValidateSelectError = true;
    }
    else {
      this.TypeValidateSelectError = false;

    }
  }
  ///////////////////////////////
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log(this.selected);
    console.log(selectedValue);
    localStorage.setItem('lng', this.selected);
  }
  /*filterChanged(selectedValue: string) {
  this.auth.savePark(selectedValue)
  .subscribe(data=>{
       this.price=data
       console.log("placePark: "+this.price)
     })
     this.selectedOption=selectedValue;
     this.markers.price=this.selectedOption;
    }*/
  submitted = false;
  addForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    priceD: new FormControl(),
    priceW: new FormControl(),
    des: new FormControl()

  });
  /*addPark(){
    if (localStorage.getItem('role') === 'supA') {

    this.submitted=true;
    this.http.post(this.addParkUrl,{
      name:this.addForm.get('name').value,
      price:this.addForm.get('price').value,
      priceD:this.addForm.get('priceD').value,
      priceW:this.addForm.get('priceW').value,
      des:this.addForm.get('des').value,
      longitude:this.Longitude,
      latitude:this.Latitude,
    }).subscribe(data =>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);

     this.resetForm();
     Swal.fire(
    {
     position: 'center',
     icon: 'success',
     title: 'Park added Successfuly',
     showConfirmButton: false,
     timer: 1500,
    });
    }, error=>{ console.log(error);} );
     }
    else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Action not allowed',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  }*/
  ajouterParking() {
    if (localStorage.getItem('role') === 'supA') {

      this.listParks.capteur = this.p;
      this.listParks.userId = this.userId.substr(1, this.userId.length - 2);
      //condition MAP
      if(!this.Latitude || !this.Longitude){
        alert('ajouter la localisation')
        
      }else{

        this.listParks.longitude = this.Longitude;
        this.listParks.latitude = this.Latitude;
        console.log("length: " + this.userId.length)
        console.log("userMarker: " + this.userId.substr(1, this.userId.length - 2))
        console.log('----------------',this.listParks);
        if (this.listParks.name !== '') {
          console.log(this.listParks.name);
          this.auth.savePark(this.listParks)
            .subscribe(
              res => {
                res = this.listParks;
                this.resetForm();
                Swal.fire(
                  {
                    position: 'center',
                    icon: 'success',
                    title: 'Park added Successfuly',
                    showConfirmButton: false,
                    timer: 1500,
                  }
                );
  
              },
              err => console.log(err));
        }
        console.log('Park informations', this.listParks);
      }
    }
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
  refreshList() {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    /*if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('Parking' , ss.user.parking);
      this.auth.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
      });
      console.log('marker', this.marker);
    } else {*/
    this.auth.getListPark(this.userId.substr(1, this.userId.length - 2))
      .subscribe((res) => {
        this.marker = res;
        const resSTR = JSON.stringify(res);
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
          new mapboxgl.Marker({ 'color': 'red' }).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.mapPark);
        });
      });
    //}

  }
  supprimerPark(_id: string) {
    if (localStorage.getItem('role') === 'supA') {

      if (confirm('Do you really want to delete this parking ?') === true) {
        this.auth.deletePark(_id).subscribe((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted Successfuly',
            showConfirmButton: false,
            timer: 1500,
          });
          this.refreshList();

        });
      }
    }
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



  resetForm() {
    this.listParks.image = '';
    this.listParks.name = '';
    this.listParks.latitude = '';
    this.listParks.longitude = '';
    this.listParks.des = '';
    this.listParks.price = '';
    this.listParks.priceD = '';
    this.listParks.priceW = '';
    this.listParks.nbplace = '';
    this.Latitude =null;
    this.Longitude = null;
   
   
  }

  public handleAddressChange(address: any) {
    this.listParks.name = address.formatted_address;
  }
  onEdit(emp) {
    if (localStorage.getItem('role') === 'supA') {

      console.log(emp);
      this.listParks.name = emp.name;
      this.listParks.latitude = emp.latitude;
      this.listParks.longitude = emp.longitude;
      this.listParks.price = emp.price;
      this.listParks.priceD = emp.priceD;
      this.listParks.priceW = emp.priceW;
      this.listParks.des = emp.des;
      this.listParks.image = emp.image;
      this.listParks.nbplace = emp.nbplace;
      this.listParks._id = emp._id;

    }
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
  modifierPark() {
    this.t = 'Your devices, ';
    this.p.push({ firstName: 'Your devices', lastName: '' });
    this.listParks.capteur = this.p;
    this.listParks.image = this.imagePreview;

    if (this.listParks.name != null) {
      this.auth.updatepark(this.listParks).subscribe((res) => {
        this.resetForm();
        this.refreshList();
        this.edits = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated Successfuly',
          showConfirmButton: false,
          timer: 1500,
        });

      });

    } else {
      this.editss = true;
    }
  }



  //****Partie Map****//
  // Afficher Map
  showMap() {
    (Mapboxgl as any).accessToken = 'pk.eyJ1Ijoibm91cnJvbWRoYW5lIiwiYSI6ImNrbmdweG81eTM3YzYyb254YnB3MG1nYXYifQ.dawn69wk0PtTvwxd7BsHgg';
    (this.map) = new Mapboxgl.Map({
      container: 'map-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9.196506147691451, 33.792635314317465], // Tunisia position
      zoom: 5.5 // starting zoom
    });
    this.map.on('click', hello => {
      this.Longitude = hello.lngLat.lng;
      this.Latitude = hello.lngLat.lat;
      this.el.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .addTo(this.map);
    });
    // Add Controls to the map
    (this.map).addControl(
      new MapboxGeocoder({
        countries: 'tn',
        accessToken: Mapboxgl.accessToken,
        mapboxgl: (mapboxgl as any),
        placeholder: 'Enter an Address ',


      }))
    // Add zoom and rotation controls to the map.
    this.map.addControl(new Mapboxgl.NavigationControl());
    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true,
      })
    );
    this.map.on('click', click => {
      this.Longitude = click.lngLat.lng;
      this.Latitude = click.lngLat.lat;
      this.el.setLngLat([click.lngLat.lng, click.lngLat.lat])
        .setPopup(new mapboxgl.Popup(
          {
            offset: 25,


          }).setHTML('<h6 class="text-info"> Longitude :' + this.Longitude + '  <br>  Latitude :' + this.Latitude + '</h6>')
        )
        .addTo(this.map)

      console.log(this.el.getLngLat())
    });
  }
  stylestreet() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v11');
  }
  stylesatelite() {
    this.map.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
  }
  stylestreet1() {
    this.mapPark.setStyle('mapbox://styles/mapbox/streets-v11');
  }
  stylesatelite1() {
    this.mapPark.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
  }


  AddMap() {
    (Mapboxgl as any).accessToken = 'pk.eyJ1Ijoibm91cnJvbWRoYW5lIiwiYSI6ImNrcTFmZm1saDBkOWMycHA4cWd3bHE2dHkifQ.C49ByMpsJCRgzLhLPtZr_Q';
    (this.mapPark) = new Mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9.196506147691451, 33.792635314317465],
      zoom: 5.5
    });
    this.mapPark.on('click', data => {
      this.Longitude = data.lngLat.lng;
      this.Latitude = data.lngLat.lat;
      this.Marker.setLngLat([data.lngLat.lng, data.lngLat.lat])
        .addTo(this.map);
    });
    // Add Controls to the map
    (this.mapPark).addControl(
      new MapboxGeocoder({
        countries: 'tn',
        accessToken: (Mapboxgl as any).accessToken,
        mapboxgl: (mapboxgl as any),
        placeholder: 'Enter an Address ',
      }))
    // Add zoom and rotation controls to the map.
    this.mapPark.addControl(new Mapboxgl.NavigationControl());
    // Add geolocate control to the map.
    this.mapPark.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true,
      })
    );


  }
  onOpenDialog(name) {
    console.log("Name : " + name);

    let dialogRef = this.matDialog.open(MapParkComponent, {
      width: '70%',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
    this.auth.setNom(name);

  }
}













