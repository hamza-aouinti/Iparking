import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  registerUserData =  {} as any;
  listUser =  {} as any;
  valid = false;
  length = false;
  password: string;
  pass = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }
  notValid() {
    console.log('rrrrrrfgddf', this.registerUserData.password.length);
    if (this.registerUserData.password.length < 8) {
      this.length = true;
    } else {
      this.length = false;
    }
  }
  registerUser() {
    this.notValid();
    if (this.registerUserData.password === this.password) {
    this.auth.forgotPassword(this.registerUserData).subscribe((res) => {
      this.router.navigate(['/login']);
    });
    } else {
      this.pass = true;
    }
    }


}
