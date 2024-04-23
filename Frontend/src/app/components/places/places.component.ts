import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { ReservationService } from 'app/services/services/reservation.service';
import { Router } from '@angular/router';
import { SocketService } from 'app/socket.service';
import { Place } from 'app/models/place.model';
import { AddPlaceComponent } from '../add-place/add-place.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as Mapboxgl from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { TranslateService } from '@ngx-translate/core';
import { SendEmailService } from 'app/services/services/send-email.service';
import { CapteursComponent } from '../capteurs/capteurs.component';
import { AuthService } from 'app/services/services/auth.service';
import { LicenseService } from 'app/services/services/license.service';

@Component({
  selector: 'app-tables',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  map: Mapboxgl.Map;
  Marker = new mapboxgl.Marker();
  popup: Mapboxgl.Popup;
  private Latitude: number;
  private Longitude: number;
  placeListUrl = '/list/listPlacewithId';
  placeUrl = '/api/AllPlaces';
  mailUrl = "/api/sendmail";
  reservedUrl = "/api/reserved";
  attributedUrl = "/api/attributed";
  alertUrl = "/api/alert";
  capteurtUrl = "/api/listCapteurs";
  listCapteurs;
  resPlaceURL = "/api/resPlace";
  adminUrl = "/api/admin"
  Selected: string;
  fr = 'en';
  List: boolean;
  Map: boolean;
  placE: Place
  //userId;
  adminId;
  email;
  marker = {} as any;
  markers = {} as any;
  reserv = {} as any;
  list = {} as any;
  liste = {} as any;
  selected: string;
  t = [] as any;
  firstName = {} as any;
  placesPark;
  reserveD;
  k;
  r: string; allplaces: Object;
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
  searchName: string = "";
  searchID: string = "";
  parkName: string = "";
  role = '';
  longueur = 0;
  longs = [];
  public data: Array<Place>;
  public data1;
  public final;
  public item;
  listPlaces;
  mailAdmin;
  user;
  selectedState;
  placesList;
  NbrPlaces;
  detailsReservation;
  nomPlace;
  licenseID;
  champsLicense;
  IdLicense;
  details;
  nbrDevices;
  constructor(private auth: ParkService, private res: ReservationService, public adminS: AuthService, public licenseService: LicenseService,
    private router: Router, private socket: SocketService,
    private matDialog: MatDialog, private http: HttpClient,
    private mailService: SendEmailService,
    public translate: TranslateService) {
    this.auth.listen().subscribe((m: any) => {
      // console.log(m);
    })
    this.refreshList();
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');

  }
  ngOnInit() {
    this.adminId = localStorage.getItem("userId");
    // console.log("Admin Id is " + this.adminId)
    this.adminS.getAdmin(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data)
        const resJSON = JSON.parse(resSTR);
        const adminDetails = resJSON;
        // console.log("Admin details :" + JSON.stringify(adminDetails))
        /*let i=0;
        for (i=0;i<10;i++){
        this.mailAdmin=adminDetails[i].email;
        console.log("Admin mail is " +this.mailAdmin)
      }*/
      })
    //this.fonction();


    this.role = localStorage.getItem('role');

    this.fetchData(this.selectedState);
    //this.listeCapteurs();
    this.showMap();
    //this.http.get(this.reservedUrl,{})
    this.auth.getReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        // console.log('getReservedPlaces' , data)
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
          new mapboxgl.Marker({ 'color': '#FF8C00' }).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
        });
      });
    this.auth.getUnReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        // console.log('getUnReservedPlaces' , data)
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
          new mapboxgl.Marker({ 'color': 'blue' }).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
        });

      });
    ////////// Licence
    this.adminS.getAdmin(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data)
        const resJSON = JSON.parse(resSTR)
        this.details = resJSON;
        // console.log("Details :" + JSON.stringify(this.details))
        this.licenseID = JSON.stringify(this.details[0].license)
        this.IdLicense = JSON.stringify(this.details[0].license)
        this.licenseID = this.licenseID.substr(1, this.licenseID.length - 2)
        // console.log("Licence identifier :" + this.details[0].license)

        //console.log("ID licence :" +this.licenseID)
        //////////
        /*if (this.IdLicense === null){
          console.log("license id null")
          this.Valide=this.storage.set('ValideLicense',false)
          this.freeLicenseDays=this.storage.get('freeLicense')
      
      
        }*/
        //if (this.IdLicense!= null){
        //else{
        /* this.licenseService.getLicenseByID(this.licenseID)
         .subscribe(res => {
           const resSTR=JSON.stringify(res);
           const resJSON=JSON.parse(resSTR)
           console.log("Details de la licence par id : " +JSON.stringify(resJSON))
           this.champsLicense=resJSON
           this.nbrDevices = this.champsLicense[0].nbrDevices;
           console.log("Number of devices : " +this.nbrDevices)
     
         })*/
        //}
        //this.Valide=this.storage.set('ValideLicense',true)

        //}


        //////////

      })
















  }

  //////////// Actualiser liste ////////////////
  refreshList() {

    this.auth.getAllPlaces(this.adminId)
      .subscribe((res) => {
        this.listPlaces = res;
        // for(var i=0 ; i<this.listPlaces.length ; i++){
        //   // console.log('chchchchchchch',this.listPlaces[i])
        // }
      });


  }
  //////////// Car in the park ////////
  CarInPark() {
    this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.NbrPlaces = resJSON.length
        // console.log("Nombre de places totales: " + this.NbrPlaces)
        let i = 0;
        for (i = 0; i < this.NbrPlaces; i++) {
          const placesList = [];
          placesList.push(resJSON[i])
          // console.log("List of places :" + JSON.stringify(placesList))
          this.placesList = resJSON;
          // console.log("Places : " + JSON.stringify(this.placesList))
          let k = 0;
          for (k = 0; k < this.placesList.length; k++) {
            // console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
            const longueur = (this.placesList[k].Capteur).length;
            let j = longueur
            // console.log("Array length : " + j)
            // console.log("Derni�re mise � jour de donn�es kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
            ///// Nombre de places o� il y a une voiture //////
            let status = this.placesList[k].Capteur[j - 1].status
            // console.log("Dernier status du parking : " + JSON.stringify(status))
            /*if (status === 0){
              console.log("Pas de voiture")
              const listNotAttributed=[]
              listNotAttributed.push(this.placesList[k])
              console.log(" Not attributed places " +JSON.stringify(listNotAttributed))
            }*/
            if (status === 1) {
              // console.log("Il y a une voiture")
              const listAttributed = []
              listAttributed.push(this.placesList[k])
              // console.log(" Attributed places " + JSON.stringify(listAttributed))

            }


          }
        }
      });
  }















  //////////// Car in the park ////////
  CarNotInPark() {
    this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.NbrPlaces = resJSON.length
        // console.log("Nombre de places totales: " + this.NbrPlaces)
        let i = 0;
        for (i = 0; i < this.NbrPlaces; i++) {
          const placesList = [];
          placesList.push(resJSON[i])
          // console.log("List of places :" + JSON.stringify(placesList))
          this.placesList = resJSON;
          // console.log("Places : " + JSON.stringify(this.placesList))
          let k = 0;
          for (k = 0; k < this.placesList.length; k++) {
            // console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
            const longueur = (this.placesList[k].Capteur).length;
            let j = longueur
            // console.log("Array length : " + j)
            // console.log("Derni�re mise � jour de donn�es kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
            ///// Nombre de places o� il y a une voiture //////
            let status = this.placesList[k].Capteur[j - 1].status
            // console.log("Dernier status du parking : " + JSON.stringify(status))
            if (status === 0) {
              // console.log("Pas de voiture")
              const listNotAttributed = []
              listNotAttributed.push(this.placesList[k])
            }
            /*if(status === 1){
              console.log("Il y a une voiture")
              const listAttributed=[]
              listAttributed.push(this.placesList[k])
              console.log(" Attributed places " +JSON.stringify(listAttributed))
      
            }*/


          }
        }
      });
  }
  ///////////////////// Supprimer Place//////////////////
  deletePlace(_id: string) {
    if (localStorage.getItem('role') === 'supA') {

      if (confirm('Do you really want to delete this place?') === true) {
        this.auth.DeletePlace(_id).subscribe((res) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Deleted Successfuly',
            showConfirmButton: false,
            timer: 1300,
          });
          this.refreshList();
          this.auth.getParkWithNameMap(this.selected).subscribe(data => {
            this.placesPark = data
          })

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
  ////////////////////////// Liste des places /////////////////////////////
  fetchData(selectedState) {
    // console.log("Selected State------------------------------------------------------- :" + selectedState)
    if (selectedState === 'Unreserved') {
      this.auth.getUnReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.listPlaces = resJSON;
          // console.log("Unreserved places :" + JSON.stringify(this.listPlaces))
        });
    }
    else if (selectedState === 'Reserved') {
      this.auth.getReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.listPlaces = resJSON;
          // console.log("Unreserved places :" + JSON.stringify(this.listPlaces))
        });
    }
    else if (selectedState === 'No Car in the park') {
      this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.NbrPlaces = resJSON.length
          // console.log("Nombre de places totales: " + this.NbrPlaces)
          let i = 0;
          for (i = 0; i < this.NbrPlaces; i++) {
            const placesList = [];
            placesList.push(resJSON[i])
            // console.log("List of places :" + JSON.stringify(placesList))
            this.placesList = resJSON;
            // console.log("Places : " + JSON.stringify(this.placesList))
            let k = 0;
            for (k = 0; k < this.placesList.length; k++) {
              // console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
              const longueur = (this.placesList[k].Capteur).length;
              let j = longueur
              // console.log("Array length : " + j)
              // console.log("Derni�re mise � jour de donn�es kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
              ///// Nombre de places o� il y a une voiture //////
              let status = this.placesList[k].Capteur[j - 1].status
              // console.log("Dernier status du parking : " + JSON.stringify(status))
              if (status === 0) {
                // console.log("Pas de voiture")
                //const listNotAttributed=[]
                this.listPlaces.push(this.placesList[k])
                // console.log(" Not attributed places " + JSON.stringify(this.listPlaces))
              }
              else if (status === 1) {
                this.listPlaces = []
              }


            }
          }
        });
    }
    else if (selectedState === 'Car in the park') {
      this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          // console.log('----------data---------',data)
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.NbrPlaces = resJSON.length
          // console.log("Nombre de places totales: " + this.NbrPlaces)
          let i = 0;
          for (i = 0; i < this.NbrPlaces; i++) {
            const placesList = [];
            placesList.push(resJSON[i])
            // console.log("List of places :" + JSON.stringify(placesList))
            this.placesList = resJSON;
            // console.log("Places : " + JSON.stringify(this.placesList))
            let k = 0;
            // console.log('papapapapapapapapapapapapapapapapapapapapapa',this.placesList)
            for (k = 0; k < this.placesList.length; k++) {
              // console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
              const longueur = (this.placesList[k].Capteur).length;
              let j = longueur
              // console.log("Array length : " + j)
              // console.log("Derni�re mise � jour de donn�es kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
              ///// Nombre de places o� il y a une voiture //////
              let status = this.placesList[k].Capteur[j - 1].status
              // console.log("Dernier status du parking : " + JSON.stringify(status))
              if (status === 0) {
                // console.log("Pas de voiture")
                this.listPlaces = []
              }
              else if (status === 1) {
                // console.log("Il y a une voiture")
                //const listAttributed=[]
                this.listPlaces.push(this.placesList[k])
                // console.log(" Attributed places " + JSON.stringify(this.listPlaces))
              }
            }
          }
        });
    }
    else if (selectedState === 'Car in the park & not reserved') {
      this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.NbrPlaces = resJSON.length
          console.log("Nombre de places totales: " + this.NbrPlaces)
          let i = 0;
          for (i = 0; i < this.NbrPlaces; i++) {
            const placesList = [];
            placesList.push(resJSON[i])
            // console.log("List of places :" + JSON.stringify(placesList))
            this.placesList = resJSON;
            // console.log("Places : " + JSON.stringify(this.placesList))
            let k = 0;
            for (k = 0; k < this.placesList.length; k++) {
              // console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
              const longueur = (this.placesList[k].Capteur).length;
              let j = longueur
              // console.log("Array length : " + j)
              // console.log("Derni�re mise � jour de donn�es kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
              let status = this.placesList[k].Capteur[j - 1].status
              let etat = this.placesList[k].reserved
              // console.log("Etat : " + etat)
              if (status === 1 && etat === true || status === 0 && etat === false || status === 0 && etat === true) {
                this.listPlaces = []
              }
              else if (status === 1 && etat === false) {
                console.log("--------Alert !")
                this.placesList = []
                this.listPlaces.push(this.placesList[k])


              }






            }
          }
        })
    }

    else {
      this.auth.getAllPlaces(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.listPlaces = resJSON;
          // console.log("Places : " + JSON.stringify(this.listPlaces))
          let i = 0;
          // console.log('-----bababababababababababagagag-----' , this.listPlaces)
          for(var j=0 ; j<this.listPlaces.length ; j++){
            // console.log('hahah', this.listPlaces[j])
            if(this.listPlaces[j].reserved==false && this.listPlaces[j].Capteur[this.listPlaces[j].Capteur.length - 1].status== 1){
              console.log('aleeeeeeeeeeeert' ,this.listPlaces[j])
              console.log('malingg')
              var mail = localStorage.getItem('name')
              console.log(mail)
              this.auth.sendEmail({list : this.listPlaces[j] , to : mail }).subscribe(res=>{
                console.log(res)
              })
            }else{
              // console.log('c bon' ,this.listPlaces[j])

            }
          }

          for (i = 0; i < this.listPlaces.length; i++) {
            this.longueur = (this.listPlaces[i].Capteur).length;
            let j = this.longueur
            const namePlace = JSON.stringify(this.listPlaces[i].name);

            //this.auth.getReservationByName(namePlace)
            /*this.http.post(this.resPlaceURL,namePlace)
        
            .subscribe(data => {
              console.log("data :" +data)
              const resSTR = JSON.stringify(data);
              const resJSON = JSON.parse(resSTR);
              console.log("resJSON :" +resJSON)
              const detailsReservation = resJSON;
              console.log("Details reservation de la place " +namePlace+ " : "+JSON.stringify(detailsReservation))
        
            });*/
          }

          //console.log(data);
          this.data1 = this.listPlaces;
          // console.log(this.listPlaces);
          // console.log('-----a-a-a-a-a-a-a-a-a-a-a-----' , this.listPlaces)
          this.listPlaces.forEach(item => {
            if (item.Capteur[this.longueur - 1].status === 1 && item.reserved === false) {
              this.mailService.sendEmail(this.adminId)
                .subscribe(Data => {
                  let res: any = Data;
                  // console.log("Email sent successfully");
                },
                  err => {
                    console.log(err);
                  }
                );
            }
          });
        });




    }
    // console.log('kakakakakakakakakakakakakakakakakaka',this.listPlaces)
  }
  filter(selectedState: string) {
    // console.log("Selected State :" + selectedState)
    if (selectedState === 'Unreserved') {
      this.auth.getUnReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          const UnreservedPlaces = resJSON;
          // console.log("Unreserved places :" + JSON.stringify(UnreservedPlaces))
        });
    }
    else if (selectedState === 'Reserved') {
      this.auth.getReservedPlaces(this.adminId.substr(1, this.adminId.length - 2))
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          const ReservedPlaces = resJSON;
          // console.log("Unreserved places :" + JSON.stringify(ReservedPlaces))
        });
    }


  }
  listeCapteurs() {
    this.http.get(this.capteurtUrl, {})
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.listCapteurs = resJSON;
        // console.log("Capteurs : " + JSON.stringify(this.listCapteurs))

      });
  }
  /////////////////// Ouvrir fen�tre d'ajout d'une palce ///////////////////
  onOpenDialog() {
    let dialogRef = this.matDialog.open(AddPlaceComponent, {
      width: '60%',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
  }
  fonction() {
    this.nomPlace = this.auth.getNomPlace();

    this.auth.getReservationByPlace(this.nomPlace)
      .subscribe(data => {
        console.log("data :" + data)
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        console.log("resJSON :" + resJSON)
        this.detailsReservation = resJSON;
        console.log("Details reservation de la place " + this.nomPlace + " : " + JSON.stringify(this.detailsReservation))
        let i = 0;
        for (i = 0; i < 2; i++) {
          const timeD = (this.detailsReservation[i].timeDebut);
          console.log("TimeD :" + timeD)
          const timeF = (this.detailsReservation[i].timeFin);
          console.log("TimeF :" + timeF)


        }
      });
  }

  /////////////////////Partie Map ///////////////////////////////////
  showMap() {
    (Mapboxgl as any).accessToken = 'pk.eyJ1Ijoibm91cnJvbWRoYW5lIiwiYSI6ImNrbmdweG81eTM3YzYyb254YnB3MG1nYXYifQ.dawn69wk0PtTvwxd7BsHgg';
    (this.map) = new Mapboxgl.Map({
      container: 'mapPlace', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [9.196506147691451, 33.792635314317465], // Tunisia position
      zoom: 5.5 // starting zoom
    });
    /*
    this.map.on('click', hello => {
      this.Longitude = hello.lngLat.lng;
      this.Latitude = hello.lngLat.lat;
      this.Marker.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .addTo(this.map);
    });*/
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
    /*
    this.map.on('click', click => {
      this.Longitude = click.lngLat.lng;
      this.Latitude = click.lngLat.lat;
      this.Marker.setLngLat([click.lngLat.lng, click.lngLat.lat])
      .setPopup(new mapboxgl.Popup(
        {
           offset: 25,


      }).setHTML('<h6 class="text-info"> Longitude :' + this.Longitude + '  <br>  Latitude :' +this.Latitude + '</h6>')
      )
        .addTo(this.map)

        console.log(this.Marker.getLngLat())
    });*/
  }
  stylestreet() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v11');
  }
  stylesatelite() {
    this.map.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
  }
  /////////////////////////////// Partie Traduction ///////////////////////////
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log(this.selected);
    console.log(selectedValue);
    localStorage.setItem('lng', this.selected);
  }

  //////////////////Alerte ////////////////////
  alert() {

    this.mailService.sendEmail(this.adminId)
      //this.http.post("/api/sendmail",user)
      .subscribe(data => {
        let res: any = data;
        console.log("Email sent successfully");
      },
        err => {
          console.log(err);
        }


      );






  }//fin alert

  onOpenHistoric(nomPlace) {
    console.log("Name : " + name);

    let dialogRef = this.matDialog.open(CapteursComponent, {
      width: '40%',

      panelClass: 'custom-modalbox',
      disableClose: true
    });
    this.auth.setNomPlace(nomPlace);

  }

























}

