import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private sendM = '/api/sendmail';

  constructor(private http: HttpClient, private router: Router) { }


  sendEmail(user) {
    return this.http.post<any>(this.sendM, user);
  }
  SendEmail(url,user) {
    return this.http.post<any>(url, user);
  }


}
