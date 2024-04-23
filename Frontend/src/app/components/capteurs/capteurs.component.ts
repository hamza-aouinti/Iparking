import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { ReservationService } from 'app/services/services/reservation.service';
import { Router } from '@angular/router';
import { SocketService } from 'app/socket.service';
import { Place } from 'app/models/place.model';
import { AddPlaceComponent } from '../add-place/add-place.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as Mapboxgl from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { TranslateService } from '@ngx-translate/core';
import { SendEmailService } from 'app/services/services/send-email.service';
import { Capteur } from 'app/models/capteur.model';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-tables',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.scss']
})
export class CapteursComponent implements OnInit {
  adminId;
  role='';
  selected: string;
  nomPlace;
  resPlaceURL="/api/resPlace";
  detailsReservation;
  BarChart=[] as any;
  dureeReserved=0;
  dureeUnreserved;
  duree=[];
  constructor(private auth: ParkService, private res: ReservationService,
    private router: Router, private socket: SocketService,
    private matDialog:MatDialog, private http:HttpClient, private matDialogRef:MatDialogRef<CapteursComponent>,
    private mailService:SendEmailService,
    public translate:TranslateService){
   /* this.auth.listen().subscribe((m:any)=>{
      console.log(m); })
      translate.addLangs(['en' , 'fr' , 'ar']);
      translate.setDefaultLang('en');*/

  }

  ngOnInit(){
    this.adminId= localStorage.getItem("userId");
    console.log("Admin Id is " +this.adminId)
    this.role = localStorage.getItem('role');
    this.nomPlace=this.auth.getNomPlace();
    console.log("Nom de place :" +JSON.stringify(this.nomPlace))
    //this.http.post(this.resPlaceURL,this.nomPlace)
    this.auth.getReservationByPlace(this.nomPlace)
    .subscribe(data => {
      console.log("data :" +data)
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      console.log("resJSON :" +resJSON)
      this.detailsReservation = resJSON;
      console.log("Details reservation de la place " +this.nomPlace+ " : "+JSON.stringify(this.detailsReservation))
      let i=0;
      for(i=0;i<2;i++){
        const timeD=(this.detailsReservation[i].timeDebut);
        console.log("TimeD :" +timeD)
        const timeF=(this.detailsReservation[i].timeFin);
        console.log("TimeF :" +timeF)

        this.dureeReserved=parseFloat(timeF)-parseFloat(timeD);
        console.log("Durée de reservation :" +this.dureeReserved+ " heures");
        this.dureeUnreserved=24 - this.dureeReserved
        console.log("Durée de non reservation :" +this.dureeUnreserved+ " heures");
        this.duree.push(this.dureeUnreserved);
        this.duree.push(this.dureeReserved)
        console.log("Duree " +this.duree)
      }
    });
    this.BarChart=new Chart('barChart',{
      type:'pie',
      data:{
        labels:["Unreserved (h)","Reserved (h)"],

        datasets:[{
          label:"Hour",
          data:this.duree,

          backgroundColor:[
            'blue','orange'
          ],
          borderWidth:1
        }]
      },
      options:{
        title:{ text:"Place Details", display:true},
        scales:{

        }
      }
    })
   ;

  }

/////////////////////////////// Partie Traduction ///////////////////////////
LanguageChanged(selectedValue: string) {
  localStorage.removeItem('lng');
  this.selected = selectedValue;
  this.translate.use(this.selected);
  console.log( this.selected);
  console.log( selectedValue);
  localStorage.setItem('lng', this.selected);
}
onCloseDialog()
   {
     this.matDialogRef.close(false);


   }



}
