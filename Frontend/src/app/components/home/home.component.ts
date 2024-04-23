import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { ReservationService } from 'app/services/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/services/services/auth.service';
import { ParkService } from 'app/services/services/park.service';
import { NotificationsService } from 'angular2-notifications';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule, FormControl  } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { MapUserComponent } from '../map-user/map-user.component';
import Swal from 'sweetalert2';
import { MapComponent } from '../map/map.component';
@Component({
  selector: 'app-forms',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listPlacee:any[]=[]
  parkSelected;
  placeSelected;
  listPlace=[]
  parks:any[]=[]
  form: any;
  reserv = {} as any;
  list = {} as any ;
  listParking = [] as any ;
  keyword = 'name';
  lista = {} as any ;
  a: string;
  data = [];
  image = '' ;
  nbPPatking = 0;
  user = localStorage.getItem('name');
  image1 = 'assets/images/cap1.JPG';
  image2 = 'assets/images/Capture.JPG';
  nbPlaceParking = 0;
  blasaFilPark: number;
  karehbaMawjouda: number;
  place = [];
  nombrePlaceDP = 0;
  userId;
  adminId;
  AdminID;
  TypeValidateSelectError: boolean;

  selected: string;
  fr = 'en';
  pHour;
  pDay;
  pWeek;
  durée:any;
  nbj=0;
  dateFin: any;
  dateDebut: any;

  collapsed = true;
  admin:string="false";
  maDate = new Date();
  dateE=new Date();
  dateS=new Date();
  addResUrl='/api/list/makeReservation';
  submitted = false;
  compteUrl='/api/compteWithId'
  compteUser;
  detailsRes;
  NomPlace;
  prixHeure;
  prixJour;
  prixSemaine;
  CompteOfUser;
  public NomParkChoisi;
  constructor(public auth: AuthService, private router: Router,
    public dialog: MatDialog, private route: ActivatedRoute,
    private auths: AuthService, private service: NotificationsService,
    public dialod: MatDialog, private parkService: ParkService, public http:HttpClient,private matDialog:MatDialog,
    public translate: TranslateService) {
      translate.addLangs(['en' , 'fr' , 'ar']);
      translate.setDefaultLang('en');

      ////////// Formulaire de reservation ///////////////////
      this.userId=localStorage.getItem('userId');
      this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      Tpark: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      dateE: new FormControl('', Validators.required),
      timeE: new FormControl('', Validators.required),
      dateS: new FormControl('', Validators.required),
      timeS: new FormControl('', Validators.required),
      priceH: new FormControl('', Validators.required),
      priceD: new FormControl('', Validators.required),
      priceW: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required),

      });


  }

  ngOnInit() {
    
    this.NomParkChoisi=this.parkService.getNom();
    console.log("Nom du parking choisi :" +this.NomParkChoisi)
    this.userId=localStorage.getItem("userId");
    console.log("User Identifier :" +this.userId)
    this.parkService.getListPlaces().subscribe((e:any)=>{
      console.log(e)
      e.forEach((x:any) => {
        this.listPlacee.push(x.name)
      });
      
    })

    this.parkService.getAllPark("event")
    .subscribe(data=>{
      console.log(data,"cfgvhbj")
      console.log()
    // const resSTR = JSON.stringify(data);
    // const resJSON = JSON.parse(resSTR);
    // this.data = resJSON;
    // this.parks=[]
    console.log("hi", this.parks)
    for(let i in data){
      this.parks.push(data[i].name)
    }
    // for (i;i<data.length();i++){
    //   console.log(this.parks)
    // this.parks.push(data[i].name)}
    console.log(this.parks)
    // const listP =JSON.stringify(resJSON)
    //console.log("listP" +listP)
    })
    this.parkService.getCompteUser(this.userId.substr(1,this.userId.length-2))
    .subscribe(res =>{
      const resSTR = JSON.stringify(res);
      const resJSON = JSON.parse(resSTR);
      this.compteUser=resJSON;
      console.log("Détails Compte :" +JSON.stringify(this.compteUser))
      let i=0;
      for(i=0;i<1;i++){
      this.CompteOfUser=this.compteUser[0].userId
      console.log("User identifier of the payment account :" +this.CompteOfUser)

      }
    })

  }



// Nombre de voitures dans le parking
  nbRepition() {
    let nb = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      if (this.reserv.name === this.list[i].name && this.reserv.dateE === this.list[i].dateS &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
          nb ++;
          console.log('ti + nb', nb);
          // tslint:disable-next-line:radix
          this.place.push(parseInt(this.list[i].place));
          console.log('gggg' , this.place );
      }
    }
    this.nbPlace();
    console.log('gggg1' , this.reserv.name );
    console.log('gggg2' , this.nombrePlaceDP);
    console.log('gggg3' , this.place);
    console.log('ti nb', nb);
    this.karehbaMawjouda = nb;
    return nb;
  }



  //Nombre de place dans le parking choisi
  nbPlace() {
    console.log("heeeeeee");
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.listParking.length ; i++) {
      if (this.listParking[i].name === this.reserv.name) {
        console.log(this.listParking[i].capteur.length-1);
        this.blasaFilPark = this.listParking[i].capteur.length;
        this.reserv.Tpark = this.listParking[i].price;
        this.nombrePlaceDP =  this.listParking[i].capteur.length;

        return this.listParking[i].capteur.length-1;
      }
    }

  }
  // Quand est-ce que une première place sera vide
  premierePlaceVide() {
    // tslint:disable-next-line:prefer-for-of
    const d = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      if (this.list[i].dateS === this.reserv.dateE) {
        if (this.list[i].timeS.getTime() > this.reserv.timeE.getTime()  ) {
          d.push(this.list[i]);
        }
      }
    }
    console.log('heeh', d);
    let max = d[0];
    for (let i = 1; i < d.length; ++i) {
      d[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      if (d[i].timeS.getTime() < max.timeS.getTime()) {
        max = d[i];
    }

      return max.timeS ;
  }

  }

  timeRespect() {
    if (this.reserv.timeE.getTime() > this.reserv.timeS.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  filterChanged(selectedValue: string) {
    this.nbPlace();
  }

  choosePlace() {
    this.nbRepition();
    this.nbPlace();
    console.log('gggg1' , this.reserv.name );
    console.log('gggg2' , this.nombrePlaceDP);
    console.log('gggg3' , this.place);
    const dataa = {} as any;
    dataa.name = this.reserv.name;
    dataa.nbPDP = this.nombrePlaceDP;
    dataa.place = this.place;
    dataa.image = this.image;

    this.router.navigate(['/map'], {
      queryParams: {data: JSON.stringify(dataa)}
    });
    this.dialod.open(FooterComponent);
  }
  selectedplace(event){
    console.log("Place non réservée du park choisi: "+event)
    this.placeSelected=event;
    let i=0
    for (i=0;i<this.listPlace.length;i++){
      console.log(this.listPlace[i])
      if (this.listPlace[i].name==this.placeSelected){
        this.adminId=this.listPlace[i].adminId
      }
    }
     console.log(" Admin Identifier: "+this.adminId )

  }



  selectedpark(parkName){
    console.log("You have selected the park: "+  parkName)
    this.parkSelected=parkName;
    ////////// Pour récupérer les prix du park choisi /////////
    this.parkService.getParkByName(parkName)
    .subscribe(data => {
      console.log(data)
    const resSTR = JSON.stringify(data);
    const resJSON = JSON.parse(resSTR);
    const data1 = resJSON ;
    console.log("Details Park :" +JSON.stringify(data1))
    let i=0;
    for (i;i<resJSON.length;i++){
    this.prixHeure= (resJSON[i].price)
    console.log("Prix du park " +parkName+ " par heure : "+this.prixHeure )
    this.prixJour= (resJSON[i].priceD)
    console.log("Prix du park " +parkName+ " par jour : "+this.prixJour)
    this.prixSemaine= (resJSON[i].priceW)
    console.log("Prix du park " +parkName+ " par semaine : "+this.prixSemaine )
    }
    });
    ///// Pour récupérer les places du park choisi ////////
    this.parkService.getParkWithName(parkName).subscribe(data=>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      console.log("data : " +JSON.stringify(resJSON)  )
      this.userId= localStorage.getItem("userId");
      console.log("userId: "+this.userId )

      this.listPlace=resJSON
      this.listPlace=[' ']
      let i=0;
      for (i;i<resJSON.length;i++){
        this.listPlace.push(resJSON[i])
        this.adminId= (resJSON[i].adminId)
        //console.log("adminId: "+this.adminId )
        this.AdminID=this.adminId;
        console.log("Admin identifier is " +this.AdminID)

      }

      console.log("Liste des places: "+ JSON.stringify(this.listPlace))

    });



  }


  Reservation(place){
    this.userId= this.userId.substr(1,this.userId.length-2)
    console.log("The user identifier is: "+this.userId)
    const data={
      park:this.parkSelected,
      place:this.placeSelected,
      dateD:this.reserv.dateE,
      dateF:this.reserv.dateS,
      timeD: this.reserv.timeE,
      timeF:this.reserv.timeS,
      priceH:this.reserv.priceH,
      priceD:this.reserv.priceD,
      priceW:this.reserv.priceW,
      totalPrice:this.reserv.totalPrice,
      matricule:this.reserv.matricule,
      userId:this.userId ,
      adminId:this.AdminID
    }
    console.log("Data Reservation :" +JSON.stringify(data))
    console.log("Park: " + data.park + " Place: " +data.place+ " mat: " +data.matricule, " admin: " +data.adminId)
    this.NomPlace=data.place
    console.log("Place :" +this.NomPlace)
    this.parkService.setPlaceRes(this.NomPlace)
    this.parkService.setDetailsRes(JSON.stringify(data))
    if(this.CompteOfUser === this.userId){
    this.parkService.makeReservation(data)
    .subscribe(data =>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      /*let i=0;
     for (i=0;i<10;i++){
      const identifier=data[i]._id
      console.log("data : "+JSON.stringify(identifier))
     }*/

     } )

    //this.router.navigate(['/consult']);
    this.router.navigate(['/payment']);
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'You do not have a payment account yet',
        showConfirmButton: false,
        timer: 2500,
      });
    }
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
  onOpenDialog(){


    let dialogRef = this.matDialog.open(MapUserComponent, {
      width: '80%',
      panelClass: 'custom-modalbox',
      disableClose:false
  });


}
}
