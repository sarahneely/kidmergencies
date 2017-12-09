import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface RegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends DialogComponent<RegisterModel, boolean> implements RegisterModel {
  model: any = {};
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
  registerForm;
  registerUrl;
  loggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, dialogService: DialogService, private http: HttpClient, private router:Router) {
    super(dialogService);
    this.createForm();
   }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      password: '',
      confirmPassword: ''
    });
  }

  onRegisterSubmit() {
    const user = {
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      phoneNumber: this.registerForm.get('phoneNumber').value,
      streetAddress: this.registerForm.get('streetAddress').value,
      city: this.registerForm.get('city').value,
      state: this.registerForm.get('state').value,
      zipCode: this.registerForm.get('zipCode').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
    };
    console.log(user);
    this.registerUrl = 'http://localhost:8080/api/register';
    this.http.post(this.registerUrl, user)
    .subscribe(data => {
      
      if (this.isLoggedIn()) {
        this.router.navigateByUrl(`/settings`);
      }
    console.log('User logged in: ', data);

    });
 }

 storeToken(name: string, token: string) {
  localStorage.setItem(name, token);
}
isLoggedIn(){
  this.loggedIn = localStorage.getItem('token') !== null;
  return this.loggedIn;
}

confirm(){
  this.result = true;
  this.close();
}
}
