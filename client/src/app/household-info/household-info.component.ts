import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-household-info',
  templateUrl: './household-info.component.html',
  styleUrls: ['./household-info.component.css'],
})
export class HouseholdInfoComponent implements OnInit {
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  user: string;
  constructor() { }

  ngOnInit() {
  }

}
