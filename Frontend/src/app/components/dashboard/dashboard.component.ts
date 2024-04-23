import { Component, OnInit } from '@angular/core';
import { ParkService } from 'app/services/services/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'app/services/services/reservation.service';
import { ChartsModule } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeComponent } from '../welcome/welcome.component';
import { Place } from 'app/models/place.model';
import { SocketService } from 'app/socket.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
//import {Chart} from 'chart.js'
import { Chart } from 'chart.js';

//import * as chart from 'chart.js';
//Chart.register(...registerables);
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reserve: any
  lineChartData = [];
  dataOfCn = [];
  lineChartType = 'line';
  lineChartLabels = [];
  LineChart = [] as any;
  BarChart = [] as any;
  TestChart = [] as any;
  DateEntree;
  HistoricChart = [] as any;
  totalPriceChart = [] as any;
  LineChart1 = [] as any;
  BarChart1 = [] as any;
  HistoricChart1 = [] as any;
  totalPriceChart1 = [] as any;
  data: any;
  data1: any;
  ReservationsList;
  ResList = [] as any;
  userId;
  NbrReservedDay = 0;
  NbrReservedDay1 = 0;

  listParks = [] as any;
  selected: string;
  list = {} as any;
  reserv = {} as any;
  t = [] as any;
  placesPark;
  placesPark1;
  Property;
  tt = [] as any;
  tts = [false, true, true, false];
  place = [] as any;
  ts = [] as any;
  parkE;
  dateone: any;
  datetwo: any
  fr = 'en';
  lun = 0;
  mar = 0;
  mer = 0;
  jeu = 0;
  ven = 0;
  sam = 0;
  dim = 0;
  listResUrl = '/api/list/listAdminReservation'
  listReservedP = '/api/reservedP'
  PRICE = 0;
  PRICE1 = 0;
  TOTALprice = 0;
  TOTALprice1 = 0;
  year = { jun: 0, fev: 0, mar: 0, avr: 0, mai: 0, jon: 0, jui: 0, out: 0, sep: 0, oct: 0, nouv: 0, dec: 0 };
  allPrices = [];
  allDates = [];
  allPlaces = [];
  allPrices1 = [];
  allDates1 = [];
  allPlaces1 = [];
  newListdate = [];
  namePlace;
  namePlace1;
  dateEntrée;
  entryDate;
  dateEntrée1;
  entryDate1;
  entryDate2;
  exitTime;
  dateDebut;
  Date: Date;
  Tprices = [];
  Tprices1 = [];
  historicDates = [];
  historicPrices = [];
  historicDates1 = [];
  historicPrices1 = [];
  dataOF = [];
  Res: any;
  RES: any;
  Res1 = [] as any;
  Res2 = [] as any;
  listRes: string[];
  listRes1: string[];
  listReservation = [];
  NbrReservedPlaces = 0;
  NbrPlaces = 0;
  NbrPlacesAttributed = 0;
  PrixTotal = 0;
  dateNow;
  NbrReservations1 = 0;
  NbrPlaces1 = 0;
  NbrPlacesAttributed1 = 0;
  PrixTotal1 = 0;
  listReservation1 = [];
  listReservation2 = [];
  longueur;
  placesList;
  placesList1;
  today: Date;
  timeNow;
  HisPrices = [];
  public PrixDesDebut = 0;
  levelsArr = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug']
  months = [
    { month: 'Jan', value: '0' },
    { month: 'Feb', value: '1' },
    { month: 'Mar', value: '2' },
    { month: 'April', value: '3' },
    { month: 'May', value: '4' },
    { month: 'June', value: '5' },
    { month: 'July', value: '6' },
    { month: 'Aug', value: '7' }
  ];
  from = '0'
  to = '7'
  adminId: string;
  role: string;
  select: string;
  listdate = [];
  nb: any = 0;

  constructor(private auth: ParkService, private auths: ReservationService,
    private router: Router, private socket: SocketService,
    private matDialog: MatDialog, public translate: TranslateService, private http: HttpClient, private datePipe: DatePipe) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');

  }

  ngOnInit(): void {

  
    this.today = new Date();
    this.timeNow = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
    console.log("Temps : ", this.timeNow)
    this.userId = localStorage.getItem("userId");
    this.Date = new Date()
    this.dateNow = this.datePipe.transform(this.Date, "dd-MM-yyyy"); //output : 2018-02-13
    console.log("Date of now:" + this.dateNow)

    //////// Afficher la liste des parks ///////////
    this.auth.getListPark(this.userId.substr(1, this.userId.length - 2)).subscribe((res) => {
      console.log("The current user ID is :  " + this.userId)
      this.listParks = res;
      console.log("Liste des parkings: " + JSON.stringify(this.listParks))
    });

    //////////// Nombre de places réservées //////////////
    this.auth.getReservedPlaces(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        console.log('aaa---------a', data)
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.RES = resJSON
        console.log("Res :" + JSON.stringify(this.RES))
        this.NbrReservedPlaces = this.RES.length

      });
    this.auth.getAdminListReservation(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        console.log(data)
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.Res = resJSON
        this.reserve = data
        console.log('---------------------ok--------------', this.reserve)
        console.log("Res :" + JSON.stringify(this.Res))

        let i = 0;
        for (i; i < this.Res.length; i++) {
          this.entryDate = (this.Res[i].dateDebut);
          console.log("Date d'entrée (nbre de reserved places)" + this.entryDate);
          /*this.historicDates.push(this.Res[i].dateDebut)
          console.log("Toutes les dates d'entrées (nbre de reserved places) :" +this.historicDates)
          this.historicPrices.push(this.Res[i].totalPrice)
          console.log("Tous les prix :" +this.historicPrices)*/
          if (this.entryDate === this.dateNow) {
            this.listReservation.push(this.Res[i])
            console.log("Liste de Réservations (nbre de reserved places): " + JSON.stringify(this.listReservation));
            this.NbrReservedDay = this.listReservation.length
            console.log("Nombre de réservations (nbre de reserved places) : " + this.NbrReservedDay)

            //////// Chart /////////
            this.BarChart = new Chart('barChart', {
              type: 'bar',
              data: {
                labels: [this.dateNow],
                datasets: [{
                  label: 'Number of reservations per day ',
                  data: [this.NbrReservedDay],
                  fill: false,
                  lineTension: 0.8,
                  //borderColor:"red",
                  borderWidth: 0.8,
                  backgroundColor: [
                    '#93B5C6'
                  ],
                  borderColor: 'blue'
                }]
              },
              options: {
                title: { text: "Reservations", display: true },
                scales: {
                  yAxes: [{
                    ticks: { beginAtZero: true }
                  }],
                  xAxes: [{
                    display: true,
                    ticks: { beginAtZero: true },
                    barPercentage: 0.05

                  }]
                }
              }
            });
          }
        }
      });
    ///////////// Nombre des places totales ///////////////
    this.auth.getAllPlaces(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.NbrPlaces = resJSON.length
        console.log("Nombre de places totales: " + this.NbrPlaces)
        let i = 0;
        for (i = 0; i < this.NbrPlaces; i++) {
          const placesList = [];
          placesList.push(resJSON[i])
          console.log("List of places :" + JSON.stringify(placesList))
          this.placesList = resJSON;
          console.log("Places : " + JSON.stringify(this.placesList))
          let k = 0;
          for (k = 0; k < this.placesList.length; k++) {
            console.log("Place " + k + " : " + JSON.stringify(this.placesList[k]))
            const longueur = (this.placesList[k].Capteur).length;
            let j = longueur
            console.log("Array length : " + j)
            console.log("Dernière mise à jour de données kafka : " + JSON.stringify(this.placesList[k].Capteur[j - 1]))
            ///// Nombre de places où il y a une voiture //////
            let status = this.placesList[k].Capteur[j - 1].status
            console.log("Dernier status du parking : " + JSON.stringify(status))
            /*if (status === 0){
              console.log("Pas de voiture")
              this.NbrPlacesAttributed=0;
            }  */
            if (status === 1) {
              console.log("Il y a une voiture")
              const listAttributed = []
              listAttributed.push(this.placesList[k])
              console.log(" Attributed places " + JSON.stringify(listAttributed))
              console.log(" Length of List of Attributed places " + (listAttributed).length)
              this.NbrPlacesAttributed = 0;
              this.NbrPlacesAttributed = listAttributed.length
            }


          }
        }
      });


    ///////////////// Prix total des Reservations /////////////////////
    this.auth.getAdminListReservation(this.userId.substr(1, this.userId.length - 2))
      .subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.data = resJSON;
        this.listRes = [' ']
        let i = 0;
        for (i; i < this.data.length; i++) {
          this.listRes.push(this.data[i])
          console.log("List of Reservations: " + JSON.stringify(this.listRes));
          this.PrixDesDebut = this.PrixDesDebut + (data[i].totalPrice)
          console.log("Prix dès le début :" + this.PrixDesDebut)
          /*this.dateDebut=data[i].dateDebut
          const DATES=[];
          DATES[i]=(this.dateDebut);
          console.log("DATES :" +DATES)*/
          this.dateEntrée = (data[i].dateDebut);
          console.log("Date d'entrée " + this.dateEntrée);

          if (this.dateEntrée === this.dateNow) {
            this.allDates[i] = this.dateEntrée
            console.log("All dates: " + this.allDates);
            this.PRICE = parseFloat(data[i].totalPrice);
            console.log("Prix de Reservation n°: " + i + " est " + this.PRICE);
            this.allPrices[i] = this.PRICE
            console.log("All prices: " + this.allPrices);
            this.TOTALprice = this.TOTALprice + this.PRICE;
            console.log("Prix total des Reservations: " + this.TOTALprice);
            this.namePlace = (data[i].palce);
            console.log("Nom de place " + this.namePlace);
            this.allPlaces[i] = this.namePlace
          }
        }
        this.Tprices.push(this.TOTALprice)
        console.log("Total :" + this.Tprices)
      })
    /////////////// Bar Chart 2 //////////////
    this.totalPriceChart = new Chart('priceChart', {
      type: 'bar',
      data: {
        labels: [this.dateNow],
        datasets: [{
          label: 'Total price per day',
          data: this.Tprices,
          backgroundColor: [
            '#93B5C6'
          ],
          borderColor: 'blue',
          borderWidth: 0.5,

        }]
      },
      options: {
        title: { text: "Total Price per day", display: true },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true }
          }],
          xAxes: [{
            display: true,
            ticks: { beginAtZero: true },
            barPercentage: 0.05

          }]
        }
      }
    });
  }

  //select parking 




  getChart() {
    
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.listdate,
        datasets: [{
          label: '# of Votes',
          data: this.dataOF,
          backgroundColor: [

            'rgba(54, 162, 235, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],

        }]
      },

    });

  }

  getChartTwo() {
    
    const myChart = new Chart("myCharttwo", {
      type: 'line',
      data: {
        labels: this.listdate,
        datasets: [{
          label: '# of Votes',
          data: this.dataOfCn,
          backgroundColor: [

            'rgba(54, 162, 235, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],

        }]
      },

    });

  }












  /////////  *************** Changement de langues ************ /////////
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log(this.selected);
    console.log(selectedValue);
    localStorage.setItem('lng', this.selected);
  }
  ////////////////////////////// ********* Filter ************////////////////////////////
  applyFilter() {
    //this.datePipe.transform(this.Date,"dd-MM-yyyy");
    //const startDate=document.getElementById('startDate');
    //const endDate=document.getElementById('endDate')
    const valueStart = (<HTMLInputElement>document.getElementById('startDate')).value
    const valueEnd = (<HTMLInputElement>document.getElementById('endDate')).value
    const startDate = this.datePipe.transform(valueStart, "dd-MM-yyyy")
    const endDate = this.datePipe.transform(valueEnd, "dd-MM-yyyy")
    console.log("Start : " + startDate + " End :" + endDate)

    const indexStart = this.historicDates.indexOf(startDate)
    const indexEnd = this.historicDates.indexOf(endDate)

    this.TestChart.data.labels = this.historicDates.slice(indexStart, indexEnd + 1)
    this.TestChart.update();
  }
  applyFilter1() {
    //this.datePipe.transform(this.Date,"dd-MM-yyyy");
    //const startDate=document.getElementById('startDate');
    //const endDate=document.getElementById('endDate')
    const valueStart = (<HTMLInputElement>document.getElementById('startDate1')).value
    const valueEnd = (<HTMLInputElement>document.getElementById('endDate1')).value
    const startDate = this.datePipe.transform(valueStart, "dd-MM-yyyy")
    const endDate = this.datePipe.transform(valueEnd, "dd-MM-yyyy")
    console.log("Start : " + startDate + " End :" + endDate)

    const indexStart = this.historicDates.indexOf(startDate)
    const indexEnd = this.historicDates.indexOf(endDate)

    this.totalPriceChart.data.labels = this.historicDates.slice(indexStart, indexEnd + 1)
    this.totalPriceChart.update();
  }
  applyFilter2() {
    //this.datePipe.transform(this.Date,"dd-MM-yyyy");
    //const startDate=document.getElementById('startDate');
    //const endDate=document.getElementById('endDate')
    const valueStart = (<HTMLInputElement>document.getElementById('startDate2')).value
    const valueEnd = (<HTMLInputElement>document.getElementById('endDate2')).value
    const startDate = this.datePipe.transform(valueStart, "dd-MM-yyyy")
    const endDate = this.datePipe.transform(valueEnd, "dd-MM-yyyy")
    console.log("Start : " + startDate + " End :" + endDate)

    const indexStart = this.historicDates.indexOf(startDate)
    const indexEnd = this.historicDates.indexOf(endDate)

    this.HistoricChart.data.labels = this.historicDates.slice(indexStart, indexEnd + 1)
    //this.HistoricChart.data.labels=this.historicDates.slice(indexStart  )

    this.HistoricChart.update();

  }

  parkData(selectedValue: string) {
    this.select = selectedValue
    this.NbrPlacesAttributed = 0;
    if (selectedValue != '') {
      this.auth.getParkWithNameMap(selectedValue).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.placesPark1 = resJSON
        console.log("Les places du park sélectionné: " + JSON.stringify(this.placesPark1))
        this.parkE = selectedValue;
        console.log("selected value: " + selectedValue);

        ///////////// Nombre des places totales dans le parking choisi  ///////////////
        this.NbrPlaces = resJSON.length
        console.log("Nombre de places totales: " + this.NbrPlaces)
        let i = 0;
        for (i = 0; i < this.NbrPlaces; i++) {
          const placesList1 = [];
          placesList1.push(resJSON[i])
          console.log("List of places :" + JSON.stringify(placesList1))
          this.placesList1 = resJSON;
          console.log("Places : " + JSON.stringify(this.placesList1))
          let k = 0;
          for (k = 0; k < this.placesList1.length; k++) {
            console.log("Place " + k + " : " + JSON.stringify(this.placesList1[k]))
            const longueur1 = (this.placesList1[k].Capteur).length;
            let j = longueur1
            console.log("Array length : " + j)
            console.log("Dernière mise à jour de données kafka : " + JSON.stringify(this.placesList1[k].Capteur[j - 1]))

            ///// Nombre de places où il y a une voiture //////
            let status = this.placesList1[k].Capteur[j - 1].status
            console.log("Dernier status du parking : " + JSON.stringify(status))
            /*if (status === 0){
              console.log("Pas de voiture")
              this.NbrPlacesAttributed=0;
            }*/
            if (status === 1) {
              console.log("Il y a une voiture")
              const listAttributed = []
              listAttributed.push(this.placesList1[k])
              console.log(" Attributed places " + JSON.stringify(listAttributed))
              console.log(" Length of List of Attributed places " + (listAttributed).length)
              this.NbrPlacesAttributed = 0;

              this.NbrPlacesAttributed = listAttributed.length

              /*const listAttributed=JSON.stringify(this.placesList[k])
              console.log("Attributed places :" +listAttributed)
              this.NbrPlacesAttributed=listAttributed.length
              console.log("Nombre de places où il y a une voiture : "+this.NbrPlacesAttributed)*/
            }


          }
        }
      });
      ///////////// Nombre de réservations par parking ///////
      this.auth.getReservationByPark(selectedValue)
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.ReservationsList = resJSON;
          console.log("Liste des réservations par parking :" + JSON.stringify(this.ReservationsList))
          if (this.ReservationsList.length === 0) {
            console.log("****** Length is 0 ***********")
            this.NbrReservedDay1 = 0;
            this.HistoricChart1 = new Chart('barChart', {
              type: 'bar',
              data: {
                labels: [this.dateNow],
                datasets: [{
                  label: 'Number of reservations per day ',
                  data: [0],
                  fill: false,
                  lineTension: 0.8,
                  //borderColor:"red",
                  borderWidth: 0.8,
                  backgroundColor: [
                    '#93B5C6'
                  ],
                  borderColor: 'blue'
                }]
              },
              options: {
                title: { text: "Reservations", display: true },
                scales: {
                  yAxes: [{
                    ticks: { beginAtZero: true }
                  }],
                  xAxes: [{
                    display: true,
                    ticks: { beginAtZero: true },
                    barPercentage: 0.05

                  }]
                }
              }
            });
          }
          else {
            let i = 0;
            for (i; i < this.ReservationsList.length; i++) {
              this.DateEntree = this.ReservationsList[i].dateDebut
              console.log("Date d'entrée ReservationList" + JSON.stringify(this.DateEntree));
              if (this.DateEntree === this.dateNow) {
                //this.ResList[i]=(this.ReservationsList[i])
                this.ResList.push(this.ReservationsList[i])
                console.log("ResList: " + JSON.stringify(this.ResList));
                console.log("Longueur ResList :" + this.ResList.length);
                console.log("******************")


                console.log("****** Length is not 0 ***********")
                this.NbrReservedDay1 = 0
                this.NbrReservedDay1 = this.ResList.length
                this.HistoricChart1 = new Chart('barChart', {
                  type: 'bar',
                  data: {
                    labels: [this.dateNow],
                    datasets: [{
                      label: 'Number of reservations per day ',
                      data: [this.NbrReservedDay1],
                      fill: false,
                      lineTension: 0.8,
                      //borderColor:"red",
                      borderWidth: 0.8,
                      backgroundColor: [
                        '#93B5C6'
                      ],
                      borderColor: 'blue'
                    }]
                  },
                  options: {
                    title: { text: "Reservations", display: true },
                    scales: {
                      yAxes: [{
                        ticks: { beginAtZero: true }
                      }],
                      xAxes: [{
                        display: true,
                        ticks: { beginAtZero: true },
                        barPercentage: 0.05

                      }]
                    }
                  }
                });
              }


              //this.NbrReservedDay=this.ResList.length;

            }
          }

        })
      //////////// Nombre de places réservées par parking //////////////
      this.auth.getReservedPlaceByPark(this.userId.substr(1, this.userId.length - 2), selectedValue)
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.listReservation1 = resJSON
          console.log("Liste des réservations par park :" + JSON.stringify(this.listReservation1))
          if (this.listReservation1.length === 0) {
            this.NbrReservedPlaces = 0;

          }
          else {
            this.NbrReservedPlaces = this.listReservation1.length

          }

          this.auth.getReservedPlaceWithName(selectedValue)
            .subscribe(data => {
              const resSTR = JSON.stringify(data);
              const resJSON = JSON.parse(resSTR);
              this.listReservation1 = resJSON
              console.log("Liste des réservations :" + JSON.stringify(this.listReservation1))
              if (this.listReservation1.length === 0) {
                //this.NbrReservedPlaces=0;
                this.historicDates1 = [];
                this.historicPrices1 = []
              }
              let i = 0;
              for (i; i < this.listReservation1.length; i++) {
                this.entryDate1 = this.listReservation1[i].dateDebut
                console.log("Date d'entrée " + JSON.stringify(this.entryDate1));
                this.historicDates1.push(this.listReservation1[i].dateDebut)
                console.log("Toutes les dates d'entrées :" + this.historicDates1)
                this.historicPrices1.push(this.listReservation1[i].totalPrice)
                console.log("Tous les prix :" + this.historicPrices1)
                if (this.entryDate1 === this.dateNow) {
                  this.Res1[i] = (this.listReservation1[i])
                  console.log("Res 1: " + JSON.stringify(this.Res1));
                  console.log("Length Res 1 :" + this.Res1.length);
                  //this.NbrReservedPlaces=0
                  //this.NbrReservedPlaces=this.Res1.length;

                }




              }
            });


        });


      ///////////////// Prix total des Reservations par parking /////////////////////
      this.auth.getReservedPlaceWithName(selectedValue)
        .subscribe(data => {
          const resSTR = JSON.stringify(data);
          const resJSON = JSON.parse(resSTR);
          this.listReservation2 = resJSON
          console.log("ListRes2: " + this.listReservation2)
          console.log("Res :" + JSON.stringify(this.listReservation1))
          //console.log("Length :" +this.listReservation1.length)
          if (this.listReservation2.length === 0) {
            this.TOTALprice = 0
            this.PrixDesDebut = 0

          }
          this.TOTALprice = 0
          this.PrixDesDebut = 0

          let i = 0;
          for (i; i < this.listReservation2.length; i++) {
            this.PrixDesDebut = this.PrixDesDebut + (this.listReservation2[i].totalPrice)
            console.log("Prix dès le début :" + this.PrixDesDebut)
            this.entryDate2 = this.listReservation2[i].dateDebut
            console.log("Date d'entrée 2 " + JSON.stringify(this.entryDate2));
            if (this.entryDate2 === this.dateNow) {
              this.Res2 = (this.listReservation2[i])
              console.log("Res2 : " + JSON.stringify(this.Res2))
              this.PRICE1 = (this.Res2.totalPrice);
              console.log("Prix de Reservation n°: " + i + " est " + this.PRICE1);
              this.TOTALprice = this.TOTALprice + this.PRICE1;
              console.log("Prix total des Reservations: " + this.TOTALprice);
              this.namePlace1 = (data[i].palce);
              console.log("Nom de place " + this.namePlace1);
              this.allPlaces1[i] = this.namePlace1


            }
          }
          this.Tprices1.push(this.TOTALprice)
          console.log("Total Tprices1:" + this.Tprices1)
        });
      this.HisPrices = this.Tprices1;
    }
    this.totalPriceChart1 = new Chart('priceChart', {
      type: 'bar',
      data: {
        labels: [this.dateNow],
        datasets: [{
          label: 'Total price per day ',
          data: this.Tprices1,
          backgroundColor: [
            '#93B5C6'
          ],
          borderColor: 'blue',
          borderWidth: 0.5
        }]
      },
      options: {
        title: { text: "Total price per day ", display: true },
        scales: {
          yAxes: [{
            ticks: { beginAtZero: true }
          }],
          xAxes: [{
            display: true,
            ticks: { beginAtZero: true },
            barPercentage: 0.1

          }]
        }
      }
    });
  }
  getDaysArray(start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  show() {
    this.dataOF = [];
    this.dataOfCn = [];
    this.listdate = [];

    let reserva = this.reserve.filter((item) => {
      return item.park === this.select
    })

    var daylist = this.getDaysArray(new Date(this.dateone), new Date(this.datetwo));
    this.listdate = daylist.map((v) =>{
      return v.toISOString().slice(0,10)
    })
   
    // console.log('tab date',this.listdate)

    for (var i=0; i<this.listdate.length ; i++){
      
      //boucle axe x pour les dates
      //console.log('111',d)
      //boucle tous les reser
      let nb = 0
      let cn = 0
      for (var j=0; j<reserva.length ; j++){
        let d = new Date(this.listdate[i])
        let day = reserva[j].dateDebut.slice(0,2)
        let month = reserva[j].dateDebut.slice(3,5)
        let year = reserva[j].dateDebut.slice(6,10)
      
        let datefi = year+"-"+month+"-"+day
        let dr = new Date(datefi)
        if(dr.toISOString() === d.toISOString()){

          nb = nb + reserva[j].totalPrice
          cn = cn +1
        }
        
       
      }
      this.dataOfCn.push(cn)
      this.dataOF.push(nb)
  

    
    }
    console.log(this.dataOF)

   
    this.getChart()
    this.getChartTwo()
    


  }


}

