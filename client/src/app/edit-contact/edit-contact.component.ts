import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmergencyContactsComponent } from '../emergency-contacts/emergency-contacts.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  image: string;
  user: string;
  contactForm;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, contacts: EmergencyContactsComponent) { 
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
