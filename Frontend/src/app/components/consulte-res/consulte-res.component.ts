import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'app/services/services/reservation.service';
import { Router } from '@angular/router';
import { ParkService } from 'app/services/services/park.service';

@Component({
  selector: 'app-consulte-res',
  templateUrl: './consulte-res.component.html',
  styleUrls: ['./consulte-res.component.css']
})
export class ConsulteResComponent implements OnInit {
  list = {} as any ;
  x = localStorage.getItem('name');
  listUne = {} as any;
  prix = 0;
  listParking  = {} as any ;
  c = localStorage.getItem('matricule');
  b: any;
  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<ConsulteResComponent>, private auth: ReservationService, private router: Router, private parkService: ParkService) { }

  ngOnInit(): void {

    this.parkService.getListPark(" ").subscribe((res) => {
      this.listParking = res;
      console.log(this.listParking);
    });
    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.list = res;
      this.listUne = this.list[(this.list.length - 1)];
      this.b = this.listUne.timeS;
      this.listUne.timeS =  new Date(Number(Date.parse(this.listUne.timeS)));
      this.listUne.timeE =  new Date(Number(Date.parse(this.listUne.timeE)));
      console.log(((this.listUne.timeS.getTime() - this.listUne.timeE.getTime()) / 3600000));
      this.prix = ((this.listUne.timeS.getTime() - this.listUne.timeE.getTime()) / 3600000);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.listParking.length; i++ ) {
        console.log('bbbbb', this.listParking[i].price);
        if (this.listUne.name === this.listParking[i].name) {
          console.log('ffffffff', this.listParking[i].price);
          // tslint:disable-next-line:max-line-length
          if (this.listUne.Tpark === 'مواقف سيارات عادية' || this.listUne.Tpark === 'normal parking' || this.listUne.Tpark === 'stationnement normal') {
            this.prix = this.prix * this.listParking[i].price;
          // tslint:disable-next-line:max-line-length
          } else if (this.listUne.Tpark === 'مواقف مغطاة للسيارات' || this.listUne.Tpark === 'covered parking' || this.listUne.Tpark === 'parking couvert') {
            this.prix = this.prix * (this.listParking[i].price + 10);
          } else {
            this.prix = this.prix * (this.listParking[i].price + 15);
          }
        }
      }
    });

  }

  deleteReservation() {
    this.auth.deletelistReservation(this.list[(this.list.length - 1)]._id).subscribe((res) => {
      console.log('sup');
      localStorage.setItem('matricule', '');
    });
  }
  price() {




  }

}
