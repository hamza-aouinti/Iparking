import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { AuthService } from 'app/services/services/auth.service';
import { ParkService } from 'app/services/services/park.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forms',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  public pageData;

  registerUserData =  {} as any;
  listAdmin = {} as any ;
  data = [] as any ;
  park = {} as any ;
  reserv = {} as any ;
  keyword = 'name';
  selected: string;
  role = '';
  selecteds = '';
  userId;
  marker = {} as any;
  Selected: string;
  fr = 'en';
  constructor(private auth: AuthService, private router: Router, private parkService: ParkService,public translate:TranslateService) {
    this.parkService.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshList();
  })
  translate.addLangs(['en' , 'fr' , 'ar']);
  translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.userId= localStorage.getItem("userId");
    this.userId=this.userId.substr(1,this.userId.length-2);
    console.log("Admin Id is " +this.userId)
    this.role = localStorage.getItem('role');
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('' , ss.user.parking);
      this.parkService.getByNamep(this.selected).subscribe((res) => {
        this.data = res;
      });
    } else {

      this.parkService.getListPark(" ").subscribe((res) => {
        this.data = res;
      });
    }
    this.auth.getListAdmin().subscribe((res) => {
      this.listAdmin = res;
    });
    this.resetForm();


  }
///////////////////////////////
LanguageChanged(selectedValue: string) {
  localStorage.removeItem('lng');
  this.selected = selectedValue;
  this.translate.use(this.selected);
  console.log( this.selected);
  console.log( selectedValue);
  localStorage.setItem('lng', this.selected);
}
  resetForm() {
    this.registerUserData.email='';
    this.registerUserData.password='';

  }


  registerUser() {
    if (localStorage.getItem('role') === 'supA') {
      console.log('Session admin')
      this.auth.registerAdmin(this.registerUserData)
      .subscribe(
        res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Admin addded Successfully ',
            showConfirmButton: false,
            timer: 1400,
          });
          this.parkService.filter('Register click');

          this.router.navigate(['/add-admin']);
        },
        err => console.log(err)
      );
      }
      else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Action not allowed',
          showConfirmButton: false,
          timer: 1500,
        });
      }


  }
  refreshList() {
    this.auth.getListAdmin().subscribe((res )=>{
      this.ngOnInit();
    }

    )

  }
  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (localStorage.getItem('role') === 'supA') {
    if (confirm('Do you really want to delete this Admin ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.ngOnInit();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully !',
          showConfirmButton: false,
          timer: 1400,
        });
      });
    }}
    else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Action not allowed',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  filterChanged(event) {
    this.selecteds = event;
    console.log('rrrr' , this.selecteds);

  }
  selectEvent(item) {
    console.log(item.name);
    this.registerUserData.parking = item.name;

}

onChangeSearch(val: string) {

  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e) {
  console.log('focus');

}

}
