import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(/*private serviceName: ServiceName*/) { }
//constructor is where you link services
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
