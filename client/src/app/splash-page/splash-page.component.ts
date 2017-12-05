import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { DialogService } from 'ng2-bootstrap-modal';

// import {ServiceName} from './service-file-path';
@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.css']
})
export class SplashPageComponent implements OnInit {
  private creds : Object = {
    email: '',
    password: ''
  };
  constructor(private dialogService:DialogService,/*private serviceName: ServiceName*/) { }
//constructor is where you link services

register() {
  let disposable = this.dialogService.addDialog(RegisterComponent, { })
}
  ngOnInit() {
  }

  login(creds) {
    console.log('login');
    console.log(this.creds);
    // this.serviceName.post(`login`, this.creds)
    //   .then((res) => {
    //
    //   });
  }

}
