import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { ReservationService } from 'app/services/services/reservation.service';
import { PriceService } from 'app/services/services/price.service';
import { ParkService } from 'app/services/services/park.service';
import { SocketService } from 'app/socket.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Place } from 'app/models/place.model';
import { AuthService } from 'app/services/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './listReservations.component.html',
  styleUrls: ['./listReservations.component.scss']
})
export class ListReservationsComponent implements OnInit {
  name;matriculE;price;dateE;dateF;timeE;timeF;Place;
  collapsed = true;

  userId;
  listR
  list = [] as any ;
  matricule: string;
  myPrice = [] as any;
  prices =  {} as any;
  marker =  {} as any;
  selected = '';
  selecteds = '';
  valid = [false, false, false] as any  ;
  placesPark: any;
  parkE: string;
  Property: string;
  tt: any;
  t: any;
  reserv: any;
  place: any;
  ts: any;
  Selected: string;
  fr = 'en';
  public data: Array<Place>;
  public data1;
  ResUrl='/api/delete/';
  listResUrl='/api/list/listReservation'
  ListRes;
  compteUser;
  montantActuel;
  constructor(public auth:AuthService,private resService: ReservationService,
    private priceService: PriceService, private socket: SocketService,
    private router: Router, private parkS: ParkService,public translate: TranslateService, private http:HttpClient) {
      translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
    }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.userId=this.userId.substr(1,this.userId.length-2)
    console.log("userId from reservation: "+this.userId);
    this.parkS.getListReservation(this.userId)
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.listR=resJSON
      console.log("listR: "+JSON.stringify(this.listR))
     } );
     this.parkS.getCompteUser(this.userId)
     .subscribe(res =>{
       const resSTR = JSON.stringify(res);
       const resJSON = JSON.parse(resSTR);
       this.compteUser=resJSON;
       console.log("Détails Compte :" +JSON.stringify(this.compteUser))
       let i=0;
       for(i=0;i<this.compteUser.length;i++){
       console.log("Montant :" +(this.compteUser[i].montant))
       }
     })
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
  refreshList() {
    this.userId= localStorage.getItem("userId");
    this.userId=this.userId.substr(1,this.userId.length-2)
    this.parkS.getListReservation(this.userId)
    .subscribe((res) => {
      this.listR = res;
    });
  }
  /*fetchData() {
    this.userId = localStorage.getItem('userId');
    this.userId=this.userId.substr(1,this.userId.length-2)
    console.log("userId from reservation: "+this.userId);
     this.http.post(this.listResUrl,this.userId)
    .subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.ListRes = resJSON
      console.log("Liste des reservations:" +this.ListRes);

    });
  }*/
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }

  onDelete(id): void {
    // console.log(id);
    if (confirm('Are you sure you want to delete this record ?') === true) {
      this.http.delete(this.ResUrl + id).subscribe(
        data => {

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
  onValidReservation(i) {
    const x = document.getElementById('mytable').getElementsByTagName('tr');
    x[i + 1].style.backgroundColor = 'yellow';
    this.prices.valeur = this.list[i].Tpark;
    this.prices.date = this.list[i].dateE;
    this.myPrice.push(this.prices);
    console.log(this.myPrice[i]);
    this.valid[i + 1] = true;
    this.priceService.savePrice(this.myPrice[i]).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  somefunction(i: number, id: string) {
    const x = document.getElementById('mytable').getElementsByTagName('tr');
    x[i + 1].style.backgroundColor = '#FFFFFF';
    this.valid[i + 1] = false;
    if (confirm('Are you sure to delete this record ?') === true) {
      this.priceService.deletePrice(id).subscribe((res) => {
      });
    }
  }

  FilterChanged(selectedValue: string) {
    this.selected = selectedValue;
    this.resService.getByName(this.selected).subscribe((res) => {
    this.list = res;
  });
  }
///Afficher la liste des parks
selectedPark(selectedValue: string) {
  this.selected = selectedValue;
  this.resService.getByName(this.selected).subscribe((res) => {
  this.list = res;
});
}

}
