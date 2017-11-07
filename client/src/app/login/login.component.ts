import { Component, OnInit } from '@angular/core';

import { KidmergenciesService }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public users;

  constructor(pivate userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
