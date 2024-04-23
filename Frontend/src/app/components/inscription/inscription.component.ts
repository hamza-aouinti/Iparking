import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
   // numTel: new FormControl(),
  });
  test = 'ok';
  submitted = false;
  constructor(private http: HttpClient, private auth: AuthService,
    private router: Router , private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
    //  numTel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    }, {
      //validator: MustMatch('password', 'confirmPassword'),
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.auth.registerUser({

          username: this.registerForm.get('username').value,
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('password').value,
         // numTel: this.registerForm.get('numTel').value,
      }).subscribe(data => {
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);

        if (resJSON.status === 'success') {

          this.router.navigate(['/auth/login/']);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500});

        }

      }, error => {Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please check information',
        showConfirmButton: false,
        timer: 1500,
      });
      });
    }}




  get f() {
    return this.registerForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
