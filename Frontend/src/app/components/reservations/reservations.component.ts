import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { ReservationService } from 'app/services/services/reservation.service';
import { Router } from '@angular/router';
import { SocketService } from 'app/socket.service';
import { MatDialog } from '@angular/material/dialog';
import { PriceService } from 'app/services/services/price.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Place } from 'app/models/place.model';

@Component({
  selector: 'app-ui-elements',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  userId;
  adminId;
  marker = {} as any;
  list = {} as any;
  selected: string;
  listR;
  matricule: string;
  myPrice = [] as any;
  prices = {} as any;
  selecteds = '';
  valid = [false, false, false] as any;
  placesPark: any;
  parkE: string;
  Property: string;
  tt: any;
  t: any;
  reserv: any;
  place: any;
  ts: any;
  ParksearchName: string = "";
  PlacesearchName: string = "";
  dateDsearch: string = "";
  dateFsearch: string = "";
  timeDsearch: string = "";
  timeFsearch: string = "";
  searchMat: string = "";
  ResUrl = '/api/deleteRes/';
  listResUrl = '/api/list/listAdminReservation'
  Selected: string;
  fr = 'en';
  public ListRes;
  prix;
  role = '';

  constructor(private parkS: ParkService, private resService: ReservationService,
    private router: Router, private socket: SocketService,
    private matDialog: MatDialog, private priceService: PriceService,
    private http: HttpClient, public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');

  }

  ngOnInit() {
    console.log('aaaatttaa')
    /*this.userId= localStorage.getItem("userId");
    this.adminId=localStorage.getItem("adminId");
    this.userId=this.userId.substr(1,this.userId.length-2)
    this.parkS.getAdminListReservation(this.userId)
    .subscribe( data=>{
     const resSTR = JSON.stringify(data);
     const resJSON = JSON.parse(resSTR);
     this.listR=resJSON
    console.log("Liste des Reservations : "+this.listR)
  } );*/
    this.fetchData();
    //this.refreshList();

  }

  fetchData() {

    this.adminId = localStorage.getItem("userId");
    console.log("Admin Id is " + this.adminId)
    this.role = localStorage.getItem('role');
    this.parkS.getAdminListReservation(this.adminId.substr(1, this.adminId.length - 2))
      .subscribe(data => {
        console.log('aaaaddddmm------',data)
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.ListRes = resJSON;
        console.log("Liste des reservations:" + JSON.stringify(this.ListRes));
        /*let i=0;
        for(i;i<this.ListRes.length;i++)
        this.prix = this.ListRes.totalPrice;
        console.log("Prix:" +this.prix)*/
      });
  }
  refreshList() {
    this.userId = localStorage.getItem("userId");
    this.adminId = localStorage.getItem("adminId");
    this.userId = this.userId.substr(1, this.userId.length - 2)
    this.http.post(this.listResUrl, this.adminId)
      .subscribe((res) => {
        this.ListRes = res;
      });
  }
  ///Afficher la liste des parks
  selectedPark(selectedValue: string) {
    this.selected = selectedValue;
    this.resService.getByName(this.selected).subscribe((res) => {
      this.list = res;
    });
  }
  //Supprimer Reservation
  onDeleteConfirm(id): void {
    // console.log(id);
    if (localStorage.getItem('role') === 'supA') {
      console.log('Session admin')
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
  ///////////////////////////////
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log(this.selected);
    console.log(selectedValue);
    localStorage.setItem('lng', this.selected);
  }
}
