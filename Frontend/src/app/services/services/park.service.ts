import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject, Observable} from 'rxjs';
import { Park } from 'app/models/park.model';
@Injectable({
  providedIn: 'root'
})
export class ParkService {
  park: Parking ;
  parks: Parking[];
  private saveParkingUrl = '/api/addParking';
  private savePlaceingUrl='/api/addPlace';
  private deleteparkUrl = 'api/list/p';
  private updateparkUrl = '/api/list/m';
  private getlistParkUrl = '/api/list/parking';
  private getlistParkUrl1 = '/api/list/parking';
  private deleteReservationUrl = '/api/delete';



  NomPark:string;
  NomPlace:string;
  Reservation:string;
  detailsRes= {}  as any;
  constructor(private http: HttpClient, private router: Router) { }


  setNom(data){
    this.NomPark=data

  }
  setNomPlace(data){
    this.NomPlace=data

  }
  setDetailsRes(data){
    this.detailsRes=data;
  }
  setPlaceRes(data){
    this.Reservation=data
  }
  getNom(){
    return this.NomPark;
  }
  getNomPlace(){
    return this.NomPlace;
  }
  getPlaceRes(){
    return this.Reservation
  }
  getDetailsRes(){
    return this.detailsRes
  }
  // tslint:disable-next-line:variable-name
  addPark(park,place)  {
    return this.http.post<any>("/api/list/listParkingwithId", {park:park,place:place} );
  }
  deletePark(_id: string) {
    return this.http.delete(this.deleteparkUrl + `/${_id}`);
  }
  getListPark(userId) {
    return this.http.post("/api/list/listParkingwithId",{userId:userId})
  }


  updatepark(emp) {
    return this.http.put(this.updateparkUrl + `/${emp._id}`, emp);
  }
  updateparkn(emp) {
    return this.http.put(this.updateparkUrl + `/${emp.name}`, emp);
  }
  savePark(user) {
    return this.http.post<any>(this.saveParkingUrl, user );
  }
  getListReservation(userId){
    return this.http.post<any>("/api/list/listReservation", {userId:userId} );


  }
  getCompte(userId){
    return this.http.post<any>("/api/compteWithId", {userId:userId} );
  }
  getCompteUser(userId){
    return this.http.post<any>("/api/compteWithId", {userId:userId} );
  }
  updateCompte(emp) {
    return this.http.put('/api/updateCompte' + '/' + emp._id, emp);
  }
  Compte(){
    return this.http.post<any>("/api/compte" ,{});


  }
  payReservation(update) {
    return this.http.put('/api/payReservation' + '/' + update._id, update);
  }
  getAdminListReservation(adminId){
    return this.http.post<any>("/api/list/listAdminReservation", {adminId:adminId} );


  }

  getByNamep(name: string) {
    return this.http.get(this.getlistParkUrl1 + `/${name}`);
  }
  savePlace(place) {
    return this.http.post<any>(this.savePlaceingUrl, place );
  }
  /*getAllPark(event){
    return this.http.post("/api/list/AllParking",event)

  }*/
  getAllPark(userId){
    return this.http.post("/api/list/AllParking",{userId:userId})

  }
  getParkWithName(name){
    return this.http.post("/api/list/ParkWithName",{name:name})

  }
  getParkByName(name){
    return this.http.post("/api/getParkingByName",{name:name})

  }
  getParkByLngLat(longitude,latitude){
    return this.http.post("/api/parking" ,{longitude:longitude ,latitude:latitude})
  }
  getPriceByName(name){
    return this.http.post("/api/prixPark",{name:name})

  }
  getPriceDayByName(name){
    return this.http.post("/api/prixDayPark",{name:name})

  }
  getPriceWeekByName(name){
    return this.http.post("/api/prixWeekPark",{name:name})

  }
  getReservationByPlace(palce){
    return this.http.post("/api/resPlace",{palce:palce})

  }
  getParkWithNameMap(name){
    return this.http.post("/api/list/ParkWithNameMap",{name:name})

  }
  getReservedPlaceWithName(name){
    return this.http.post("/api/list/ReservedPlaceWithName",{name:name})

  }

  makeReservation(data){
    return this.http.post("/api/list/makeReservation",{data:data})


  }
  getReservationByPark(park){
    return this.http.post("/api/ResPark",{park:park})

  }
  addReservation(park,palce,matricule,dateDebut,dateFin,priceH,priceD,priceW,totalPrice,userId,adminId){
    return this.http.post("/api/list/makeReservation",{park:park,palce:palce,matricule:matricule,dateDebut:dateDebut,dateFin:dateFin,priceH:priceH,priceD:priceD,priceW:priceW,totalPrice:totalPrice,userId:userId,adminId:adminId})


  }
  deleteReservation(_id: string) {
    return this.http.delete(this.deleteReservationUrl + `/${_id}`);
  }
  deleteReservationAdmin(_id: string) {
    return this.http.delete("/api/deleteRes" + `/${_id}`);
  }
  addPlace(park, place,adminId,rang){
    return this.http.post<any>("/api/list/addPLace", {place:place,park:park,adminId:adminId,rang:rang} );
  }

  sendEmail(data:any){
    console.log('data dataa dataaaa' , data)
    return this.http.post<any>("/api/alert/mailing" , data)

  }
  AddPlace(park, place,adminId,code,lng,lat,Capteur){
    console.log('add---place--park',park)
    console.log('add---place--adminId',adminId)
    console.log('add---place--code',code)
    console.log('add---place--Capteur',Capteur)
    return this.http.post<any>("/api/addPlaceTesting", {place:place,park:park,adminId:adminId,code:code,lng:lng,lat:lat,Capteur:Capteur} );
  }
  UpdatePlace(place){
   return this.http.put("/api/updatePlace" + ` /${place._id}`, place)
  }
  getListPlaces(){
    return this.http.get("/api/AllPlaces")
  }
  getAllPlaces(userId) {
    return this.http.post("/api/list/listPlacewithId",{userId:userId})
  }

  getReservedPlaces(userId){
    return this.http.post("/api/reservedP" , {adminId:userId})
  }
  getReservedPlaceByPark(userId,park){
    return this.http.post("/api/reservedPlaceParPark" , {adminId:userId,park:park})
  }
  getUnReservedPlaces(userId){
    return this.http.post("/api/unreservedP" , {adminId:userId})
  }
  getUnReservedPlace(){
    return this.http.get("/api/unreserved" )
  }
  getAttributedPlaces(adminId){
    return this.http.post("/api/attributedP",{adminId:adminId})
  }
  addCompte(userId,cin,numCard,montant){
    return this.http.post<any>("/api/addCompte",{userId:userId,cin:cin,numCard:numCard,montant:montant});
  }
 deletePlace(place,code){
    return this.http.post("/api/list/deletePlace",{place:place,code:code})

   }
   DeletePlace(_id: string) {
    return this.http.delete("/api//deletePlace" + `/${_id}`);
  }

 getListAllPark() {
    return this.http.post("/api/list/listAllParking",{})
  }
 private _listners=new Subject<any>();
 listen():Observable<any>{
   return this._listners.asObservable();
 }
 filter(filterBy:string){
   this._listners.next(filterBy);
 }

sendMessage(firstName,lastName,email,subject,message){
  return this.http.post<any>("/api/addMessage",{firstName:firstName,lastName:lastName,email:email,subject:subject,message:message})
}
deleteMesssage(_id: string) {
  return this.http.delete("/api/deleteMessage" + `/${_id}`);
}
getAllMessages(){
  return this.http.get("/api/AllMessages")

}
}
interface Parking {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  image:string;
  price: string;
  priceD:string;
  priceW:string;
  description:string;
  nbplace: number;
  capteur: [] ;

}

