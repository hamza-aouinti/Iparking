import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {User } from 'app/models/user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = '/api/register';

  private loginUrl = '/api/login';
  private loginUrls = '/api/logins';
  private loginUrlsa = '/api/loginsa';
  private registerUrla = '/api/registera';
  private registerUrlas = '/api/registers';
  private registerUrlasa = '/api/registersa';
  private loginUrla = '/api/logina';
  private getlistAdminUrl = '/api/list/admin';
  private deletepadminUrl = '/api/list/admin';
  private getListUser = '/api/list/user';
  private getByName = '/api';
  private forgotPass = '/api/list/user';




  constructor(private http: HttpClient, private router: Router) { }

  changePass(data:any , id :any){
    return this.http.put<any>('/api/changePassword/'+id , data)
  }

  sendCode (data:any){
    return this.http.post<any>('/api/send/code' , data)
  }

  getUserByEmail(email:any){
    return this.http.get<any>('/api/list/user/email/'+email)
  }

  loginUser(user ) {
    return this.http.post<any>(this.loginUrl, user);
  }
  loginAdmin(user) {
    return this.http.post<any>(this.loginUrla, user);
  }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  registerAdmin(user) {
    return this.http.post<any>(this.registerUrla, user);
  }
  getListAdmin() {
    return this.http.get<any>(this.getlistAdminUrl);
  }
  getListusers() {
    return this.http.get<any>(this.getListUser);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setLoggedina() {
    localStorage.setItem('isAdmin', 'true');

  }
   loggedIn() {
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line:variable-name
  deletePark(_id: string) {
    return this.http.delete(this.deletepadminUrl + `/${_id}`);
  }
  getBynames(email: string) {
    return this.http.delete(this.getByName + `/${email}`);
  }
  forgotPassword(emp) {
    return this.http.put(this.forgotPass + `/${emp.email}`, emp);
  }
  loginSUP(user ) {
    return this.http.post<any>(this.loginUrls, user);
  }

  registerSup(user) {
    return this.http.post<any>(this.registerUrlas, user);
  }
  loginSUPA(user ) {
    return this.http.post<any>(this.loginUrlsa , user);
  }

  registerSupA(user) {
    return this.http.post<any>(this.registerUrlasa, user);
  }
  getAdmin(_id){
    return this.http.post<any>("/api/admin",{_id:_id})
  }

}
