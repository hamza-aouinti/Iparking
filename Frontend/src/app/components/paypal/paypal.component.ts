import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { style } from '@angular/animations';
import { Place } from 'app/models/place.model';
import { HttpClient } from '@angular/common/http';
import {Chart} from 'chart.js'
import { AuthService } from 'app/services/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ParkService } from 'app/services/services/park.service';


@Component({
  selector: 'app-forms',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  LineChart=[] as any;
  BarChart=[] as any;
  collapsed = true;
  selected:string;
  fr = 'en';
  data: any;
  listRes: string[];
  userId;
  PRICE=0;
  TOTALprice=0;
  allPrices=[];
  allDates=[];
  dateEntrée;
  constructor(private router: Router, public auth:AuthService, public translate:TranslateService, private parkService:ParkService,
      private route: ActivatedRoute,private http: HttpClient,) {

  }

  ngOnInit() {
    this.userId= localStorage.getItem("userId");
    this.listReservations();



    this.LineChart = new Chart('lineChart' , {
      type:'line',
      data:{
        labels:this.allDates,
        datasets:[{
          label:'Number of items Sold',
          data:this.allPrices,
          fill:false,
          lineTension:0.2,
          borderColor:"green",
          borderWidth:1
        }]
      },
      options:{
        title:{ text:"Line Chart", display:true},
        scales:{
          yAxes:[{
            ticks:{ beginAtZero:true}
          }]
        }
      }
    });

    this.BarChart=new Chart('barChart',{
      type:'bar',
      data:{
        //labels:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        labels:this.allDates,

        datasets:[{
          label:"Sold",
          //data:[9,8,3,7,5,4,2],
          data:this.allPrices,

          backgroundColor:[
            'blue','red','grey','green','orange','black','indigo'
          ],
          borderWidth:1
        }]
      },
      options:{
        title:{ text:"Bar Chart", display:true},
        scales:{
          yAxes:[{
            ticks:{ beginAtZero:true}
          }]
        }
      }
    })
   ;


  }
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
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
  listReservations(){
    this.parkService.getAdminListReservation(this.userId.substr(1,this.userId.length-2))
    .subscribe(data=>{
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    this.data = resJSON;
    this.listRes=[' ']
    let i=0;
    for (i;i<this.data.length;i++){
    this.listRes.push(this.data[i])
    console.log("List of Reservations: "+ JSON.stringify(this.listRes));
    this.PRICE= parseFloat(data[i].totalPrice);
    console.log("Prix de Reservation n°: " + i + " est " +this.PRICE);
    this.allPrices[i]=this.PRICE
    console.log("All prices: " +this.allPrices);
    //////////
    this.dateEntrée= (data[i].dateDebut);
    console.log("Date d'entrée " +this.dateEntrée);
    this.allDates[i]=this.dateEntrée
    console.log("All dates: " +this.allDates);

    }})
  }
}
