import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Subject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  constructor(private http: HttpClient, private router: Router) { }
  AddLicense(){
    return this.http.post<any>("/api/addLicense",{})
  }
  getListLicense() {
    return this.http.post<any>("api/ListLicense",{});
  }
  getLicenseByAdmin(adminId){
    return this.http.post<any>("/api/getLicenseByAdmin" ,{adminId:adminId})
  }
  getLicenseByID(id){
    return this.http.post("/api/getLicenseByID" ,{id} )
  }
  VerifValidity(id){
    return this.http.post("/api/VerifValidity" ,{id} );

  }
  /*VerifFreeLicense(user){
    return this.http.get("/api/VerifFreeLicense/" + user);
  }*/
  VerifFreeLicense(_id){
    return this.http.post("/api/VerifFreeLicense" ,{_id:_id});
  }
  ActivateLicense(id,key){
        return this.http.get("/api/ActivateLicense/" + id + '/' + key );


  }









}
