import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ParkService } from 'app/services/services/park.service';
import { HttpClient } from '@angular/common/http';
import { Compte } from 'app/models/compte.model';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm} from '@angular/forms';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  selected: string;
  fr = 'en';
  userId;
  compte={} as any;
  listR;
  public data: Array<Compte>;
  public data1;
  collapsed = true;
  pencil:boolean;

  submitted = false;
  constructor(public translate:TranslateService,public auth:AuthService,
    private parkS:ParkService,private http:HttpClient,public router: Router) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userId=this.userId.substr(1,this.userId.length-2)
    console.log("The user Id is: "+this.userId);
    this.parkS.getCompte(this.userId)
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.compte=resJSON;
      console.log("Details du compte: "+JSON.stringify(this.compte))
     } );
  }
  editForm = new FormGroup({
    _id:new FormControl(),
    userId: new FormControl(),
    add: new FormControl(),
    numCard:new FormControl(),
    code:new FormControl(),
    montant:new FormControl(),
  });
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
  resetForm() {
    this.compte.numCard= '';
    this.compte.montant= '';
    this.compte.code= '';
    this.compte.add= '';
  }
  refresh(){
    this.parkS.getCompte(this.userId)
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);
        this.compte=resJSON;
      console.log("Details du compte: "+JSON.stringify(this.compte))

     } );
  }
  edit(emp){
    console.log("Details compte" +JSON.stringify(emp))
    this.compte._id=emp._id;
    this.compte.userId=emp.userId;
    //this.compte.add=emp.compte.add;
    this.compte.numCard=emp.numCard;
    this.compte.code=this.compte.code;
    this.compte.montant=emp.montant;


    console.log("Compte" +JSON.stringify(this.compte))

  }
  ModifierCompte(form:NgForm){
    try{
    if (form.value.code === ""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Enter your secret code please !',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    else if (form.value.code !="" ){
      if (form.value.add >= 10000) {
    console.log("Values:" +JSON.stringify(form.value))
    this.parkS.updateCompte(form.value)
    .subscribe(res => {

      res = this.compte ;
      this.resetForm();
      this.refresh();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated Successfuly',
        showConfirmButton: false,
        timer: 1500,
      });

    });


  }
  else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Add an amount > 10 dt please !',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  }// fin else if
}//fin try
    catch(err){
      console.log(err);
    }
  }
}
