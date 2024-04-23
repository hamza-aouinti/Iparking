import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { ParkService } from 'app/services/services/park.service';

@Component({
  selector: 'app-map',
  templateUrl: './map-user.component.html',
  styleUrls: ['./map-user.component.scss']
})
export class MapUserComponent implements OnInit {
  public pageData;
  map:Mapboxgl.Map;
  public m = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  marker : any ;
  public data1: Array<any>;
  name;
  parkUrl='/api/list/AllParking';
  lng:Number
  lat:Number
  public NomPark;
  constructor( private parkS:ParkService, private router: Router, private route: ActivatedRoute,private http: HttpClient, private matDialogRef:MatDialogRef<MapUserComponent>) {}

  ngOnInit() {
    this.showMap();

    /*this.parkS.getUnReservedPlace()
    .subscribe(data => {
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
        new mapboxgl.Marker({ 'color': 'blue'}).setLngLat([item.lng, item.lat]).setPopup(popup).addTo(this.map);
      });

    });*/
    this.http.post(this.parkUrl,
      {
      }).subscribe(data => {
        console.log(data)

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
          '<h2 class="text-info">' + item.name + '</h2>' + '<h5 class="text-basic"> ' +'<h4 class="text-info">' + item.des + '</h4>' ,

         // + 'Lignes : ' + item.lignesId.length + '</h5>',
        );
        new mapboxgl.Marker({ 'color': 'red'}).setLngLat([item.longitude, item.latitude]).setPopup(popup).addTo(this.map);
      });

    });


  }

showMap(){
  (Mapboxgl as any).accessToken=environment.mapboxKey;
  (this.map) = new Mapboxgl.Map({
  container: 'map-mapbox1', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center:  [9.196506147691451 , 33.792635314317465], // Tunisia position
  zoom:5// starting zoom
  });
(this.map).addControl(
    new MapboxGeocoder({
    countries:'tn',
    accessToken: Mapboxgl.accessToken,
    mapboxgl: (mapboxgl as any),
    placeholder: 'Enter an Address ',

    }))
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
      );
      this.map.on('click', hello => {
        this.Longitude = (hello.lngLat.lng);
        this.Latitude = hello.lngLat.lat;


        this.m.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .setPopup(new mapboxgl.Popup(
          {
             offset: 25,


        }).setHTML('<h6 class="text-info"> Longitude :' + this.Longitude + '  <br>  Latitude :' +this.Latitude + '</h6>')
        )
          .addTo(this.map)


          console.log("Longitude & Latitude :"+this.m.getLngLat())
          //console.log("Longitude :" +this.Longitude + " Latitude : " +this.Latitude)
          this.lng=parseFloat((hello.lngLat.lng).toFixed(1));
          console.log("Longitude :" +this.lng)
          this.lat=parseFloat((hello.lngLat.lat).toFixed(1));
          console.log("Latitude :" +this.lat)
          this.parkS.getParkByLngLat(this.lng,this.lat)
          .subscribe(data => {
            console.log(data)
            const resSTR = JSON.stringify(data);
            console.log(resSTR)
            const resJSON = JSON.parse(resSTR);
            const park = resJSON ;
            console.log("Details park :" +JSON.stringify(park))
            let i=0;
            for(i=0;i<1;i++){
              this.NomPark=park[i].name;
              console.log("Nom du parking Map:" +this.NomPark)

            }
            //this.router.navigate(['/home'])

          })
});

}
/*createMarker(lng:number, lat:number){
  const marker=new Mapboxgl.Marker({
    draggable:true
  })
  .setLngLat([lng,lat])
  .addTo(this.map);
  marker.on('drag',() => {
    console.log(marker.getLngLat());
  })

}*/

stylestreet() {
  this.map.setStyle('mapbox://styles/mapbox/streets-v11');
}
stylesatelite() {
  this.map.setStyle('mapbox://styles/nourromdhane/ckp2g5lp3454517mj9esmvkcg');
}
onCloseDialog(name)
   {
    console.log("Close")
    this.parkS.setNom(name)

     this.matDialogRef.close();
     this.router.navigate(['/home'])

   }
}

