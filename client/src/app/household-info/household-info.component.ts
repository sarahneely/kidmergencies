import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-household-info',
  templateUrl: './household-info.component.html',
  styleUrls: ['./household-info.component.css'],
})
export class HouseholdInfoComponent implements OnInit {
  firstName: string;
  lastName: string;
  relationship: string;
  conditions: string;
  allergies: string;
  medical: any = []; 
  contactForm;
  count: number = 0;
  contactsUrl: any;
  contacts: any = [];
  contact: any;
  contact_id: any;
  allUserContactsUrl: string;
  editContactUrl: string;
  token: string = localStorage.getItem('token');
  private headers: Headers = new Headers();
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.createForm();
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      phone: '',
      firstName: '',
      lastName: '',
      relationship: '',
      image: '',
      user: ''
    });
  }

  ngOnInit() {
  }

}
