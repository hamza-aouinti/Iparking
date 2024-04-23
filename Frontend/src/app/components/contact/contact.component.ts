import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public pageData;
  selected: string;
  fr = 'en';
  messageUrl = '/api/addMessage';
  collapsed = true;
  admin:string="false";
  constructor(public auth:AuthService,public router: Router, private route: ActivatedRoute, private http: HttpClient, public translate: TranslateService) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
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
  LanguageChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }
  addForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email:new FormControl(),
    subject:new FormControl(),
    message:new FormControl(),
  });
  submitted = false;
  onSubmit(){
    this.submitted=true;
    this.http.post(this.messageUrl, {
      firstName:this.addForm.get('firstName').value,
      lastName:this.addForm.get('lastName').value,
      email:this.addForm.get('email').value,
      subject:this.addForm.get('subject').value,
      message:this.addForm.get('message').value,
    })
    .subscribe(data => {
      const resSTR = JSON.stringify(data);
      const resJSON = JSON.parse(resSTR);

      { Swal.fire(
        'Success!',
        'Message sent successfully',
        'success',);
      this.addForm.reset();
      }
    }, error=>{ console.log(error);}

    );
}

}
