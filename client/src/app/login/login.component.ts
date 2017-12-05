import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

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
loginForm;

  constructor( dialogService: DialogService){
    super(dialogService);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
}
