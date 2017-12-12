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
user: any;

public id;
form;

  constructor(private http: HttpClient, dialogService: DialogService, private router: Router){
    super(dialogService);
  }
  loggedIn: boolean = false;
  private loginUrl: string;
  public user_email;
  onSubmit(user){
    console.log('user', user);
    this.loginUrl = "http://localhost:8080/api/login";
    this.http.post(this.loginUrl, user)
    .subscribe(data => {
    console.log('data object : ', data);
    this.storeToken('token', data['token']);
    console.log('data[`userId`]', data['userId']);
    this.storeId('id', data['userId']);
    if (this.isLoggedIn()) {
      this.router.navigateByUrl(`/kid-view`);
    }
    // this.USER = data;
    // this.id = USER.id;
    });
    // this.user_email = this.user.email;
  }
  storeToken(name: string, token: string) {
    localStorage.setItem(name, token);
  }
  storeId(name: string, id: string) {
    localStorage.setItem(name, id);
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
