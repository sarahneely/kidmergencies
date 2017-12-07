import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup} from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient, dialogService: DialogService){
    super(dialogService);
  }
  private loginUrl: string;

  onSubmit(user){
    console.log('user', user);
    this.loginUrl = "http://localhost:8080/api/login";
    this.http.post(this.loginUrl, user)
    .subscribe(data => {
    console.log('User logged in: ', data);
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
}
