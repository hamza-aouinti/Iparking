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
  templateUrl: './map-park.component.html',
  styleUrls: ['./map-park.component.scss']
})
export class MapParkComponent implements OnInit {
  public pageData;
  map:Mapboxgl.Map;
  public m = new mapboxgl.Marker();
  private Latitude: number;
  private Longitude: number;
  marker : any ;
  public data1: Array<any>;
  name;
  constructor( private parkS:ParkService, private router: Router, private route: ActivatedRoute,private http: HttpClient, private matDialogRef:MatDialogRef<MapParkComponent>) {}

  ngOnInit() {

    this.showMap();
    this.name=this.parkS.getNom();
    console.log("Park name :" +this.name)
    const parkIDUrl="/api/list/ParkWithName"
    const parkUrl="/api/getParkingByName"
    //this.http.post(parkUrl,this.name)
    this.parkS.getParkByName(this.name)
    .subscribe(data => {
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data1 = resJSON ;
    console.log("Details Park :" +JSON.stringify(this.data1))

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
  zoom:5.5// starting zoom
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
      /*this.map.on('click', hello => {
        this.Longitude = hello.lngLat.lng;
        this.Latitude = hello.lngLat.lat;
        this.m.setLngLat([hello.lngLat.lng, hello.lngLat.lat])
        .setPopup(new mapboxgl.Popup(
          {
             offset: 25,


        }).setHTML('<h6 class="text-info"> Longitude :' + this.Longitude + '  <br>  Latitude :' +this.Latitude + '</h6>')
        )
          .addTo(this.map)

          console.log(this.m.getLngLat())
});*/

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
onCloseDialog()
   {
     this.matDialogRef.close();
   }
}

