import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/services/auth.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  iduser : any
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;
  emaill: any
  code: any
  CD:any
  data: any
  selected: string;
  newPass: any
  conPass: any
  fr = 'en';
  datadata :any
  constructor(private auth: AuthService, private router: Router, private http: HttpClient, public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');
  }


  ngOnInit(): void {
    localStorage.setItem('admin', "false");
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;

      localStorage.setItem("userId", this.listUser[1]._id)
      console.log("userList: " + this.listUser[1]._id)
    });
  }

  open() {
    const container = document.getElementById('Login');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModalToggle2');
    container?.appendChild(button);
    button.click();

  }

  verifCode() {
    if(this.CD == this.code){
      const close = document.getElementById('closeone')
      close.click();
      const container = document.getElementById('Login');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#exampleModalToggle3');
      container?.appendChild(button);
      button.click();
    }else{
      alert('code incorrect')
    }
  }

  change(){
    console.log(this.newPass)
    console.log(this.conPass)
    if (this.newPass == this.conPass){
      this.auth.changePass({pass : this.newPass} , this.iduser).subscribe(res=>{
        console.log(res)
        const close = document.getElementById('closetwo')
        close.click();

      })
    }else{
      alert('confirm password invalid')
    }
  }

  

  sendEmail() {
    this.auth.getUserByEmail(this.emaill).subscribe(res => {
      if (res) {
        this.datadata = res
        this.iduser = this.datadata._id
        console.log(this.iduser)
        const close = document.getElementById('close')
        close.click();
        const container = document.getElementById('Login');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModalToggle1');
        container?.appendChild(button);
        button.click();
        this.CD = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        this.auth.sendCode({code : this.CD , email : this.emaill}).subscribe(res=>{
          console.log('le code teb3ath')
        })
      } else {
        alert("email invalid")
      }
    })




  }


  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log(this.selected);
    console.log(selectedValue);
    localStorage.setItem('lng', this.selected);
  }
  loginUser() {
    console.log("current Email: " + this.loginUserData.email)
    this.http.post("/api/list/curentSimpleUser", { email: this.loginUserData.email }).subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);
      this.data = resJSON;
      console.log('curentUserID: ' + JSON.stringify(resJSON[0]._id))
      localStorage.setItem('userId', JSON.stringify(resJSON[0]._id));
      console.log("UserId: " + JSON.stringify(resJSON[0]._id))

    });
    // tslint:disable-next-line:prefer-for-of

    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          const resSTR = JSON.stringify(res);
          const resJSON = JSON.parse(resSTR);
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', this.loginUserData.email);
          if (resJSON.status === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Welcome ! ',
              showConfirmButton: false,
              timer: 1000,
            });

            this.router.navigate(['/home']);
            localStorage.setItem('role', 'user');
            this.incorrect = false;
          }
          else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Please check your Informations !',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        }

      );

  }

}
