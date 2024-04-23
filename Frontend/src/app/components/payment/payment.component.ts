import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardPaymentComponent } from '../cardPayment/cardPayment.component';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/services/services/auth.service';
import { ParkService } from 'app/services/services/park.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { parse } from 'path';
declare global {
  interface Window { paypal: any; }
}
@Component({
  selector: 'app-forms',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  format="5.2-2";
  public pageData;
  focus: any;
  focus1: any;
  selected: string;
  fr = 'en';
  collapsed = true;
  nomPlace;
  compteUser;
  userId;
  montantActuel;
  montantAPayer;
  listReservation ={} as any;
  detailsReservation;
  compteId;
  compteCode;
  compteNumCard;
  compte={} as any;
  reserv = {} as any;

  @ViewChild('paypal', {static:true}) paypalElement:ElementRef;

  constructor(private router: Router,public auth:AuthService, private route: ActivatedRoute, private parkS:ParkService,
    private matDialog:MatDialog, public translate:TranslateService) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
  }
  editForm = new FormGroup({
    _id:new FormControl(),
    add:new FormControl(),
    numCard:new FormControl(),
    code:new FormControl(),
    montant:new FormControl(),
  });
  ngOnInit() {
    this.parkS.Compte()
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.compte=resJSON;
      console.log("Details du compte: "+JSON.stringify(this.compte))
     } );
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
    this.userId=localStorage.getItem("userId");
    this.nomPlace=this.parkS.getPlaceRes();
    console.log("Place name :" +this.nomPlace)
    this.parkS.getCompteUser(this.userId.substr(1,this.userId.length-2))
    .subscribe(res =>{
      const resSTR = JSON.stringify(res);
      const resJSON = JSON.parse(resSTR);
      this.compteUser=resJSON;
      console.log("Détails Compte :" +JSON.stringify(this.compteUser))
      let i=0;
      for(i=0;i<10;i++){
      this.compteId=this.compteUser[i]._id
      console.log("Compte Id :" +this.compteId)
      this.compteNumCard=this.compteUser[i].numCard
      console.log("Num Card :" +this.compteNumCard)
      this.compteCode=this.compteUser[i].code
      console.log("Compte Code :" +this.compteCode)
      this.montantActuel=this.compteUser[i].montant
      console.log("Montant actuel :" +this.montantActuel)
      }
    })
    this.parkS.getReservationByPlace(this.nomPlace)
    .subscribe(res =>{
      const resSTR = JSON.stringify(res);
      const resJSON = JSON.parse(resSTR);
      this.detailsReservation=resJSON;
      console.log("Détails Reservation :" +JSON.stringify(this.detailsReservation))
      let i=0;
      for(i=0;i<10;i++){
      this.montantAPayer=this.detailsReservation[i].totalPrice;
      console.log("Montant à payer" +this.montantAPayer)
      }
    })
    this.listReservation=this.parkS.getDetailsRes();
    console.log("Résevation maintenant : " +(this.listReservation))
    /*window.paypal.Buttons({
      style:{
        //layout:'horizontal'
      },
      createOrder:(data,actions) =>{
        return actions.order.create({
          purchase_units :[{
            amount: {
              value: '2000'
            },
              currency:"USD",
            }]
        })
      },
      onApprove : (data, actions) =>
      {
        return actions.order.capture().then(details => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully paid .. ! ',
            showConfirmButton: false,
            timer: 1300,
          });
        })
      },
      onError : error => {
        console.log(error);
      }


    }).render(this.paypalElement.nativeElement);
*/

  }
    payReservation(form:NgForm){
    try{

    /*this.parkS.makeReservation(this.listReservation)
    .subscribe(data =>{
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      //console.log("Réserver : " +JSON.stringify(resJSON))

     } )*/
     console.log("Values:" +JSON.stringify(form.value))
   if(parseInt(form.value.montant) - parseInt(form.value.add) != 0){
    this.parkS.payReservation(form.value)
    .subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your reservation is paid successfully !',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/consult']);
    });
   }
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'You current amount is not enough to pay your reservation ',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
    catch(err){
      console.log(err);
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

  onOpenDialog(){
    let dialogRef = this.matDialog.open(CardPaymentComponent, {
      width: '25%',
      panelClass: 'custom-modalbox',
      disableClose:true
  });
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
}
