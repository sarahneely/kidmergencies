import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface LoginModel{
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent extends DialogComponent<LoginModel, boolean> implements LoginModel{
model: any = {};
email: string;
password: string;
form;

  constructor(private http: HttpClient, dialogService: DialogService, private router: Router){
    super(dialogService);
  }
  loggedIn: boolean = false;
  private loginUrl: string;

  onSubmit(user){
    console.log('user', user);
    this.loginUrl = "http://localhost:8080/api/login";
    this.http.post(this.loginUrl, user)
    .subscribe(data => {
    console.log('User logged in: ', data);
    this.storeToken('token', data['token']);
    if (this.isLoggedIn()) {
      this.router.navigateByUrl(`/home`);
    }
    });
  }
  storeToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }
  isLoggedIn(){
    this.loggedIn = localStorage.getItem('token') !== null;
    return this.loggedIn;
  }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
}
