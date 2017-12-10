import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.css']
})
export class EmergencyContactsComponent implements OnInit {
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  image: string;
  user: string;
  contactForm;
  contactsUrl: any;

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

  onSubmit() {
    const contact = {
      phone: this.contactForm.get('phone').value,
      firstName: this.contactForm.get('firstName').value,
      lastName: this.contactForm.get('lastName').value,
      relationship: this.contactForm.get('relationship').value,
      image: this.contactForm.get('image').value, 
      user: this.contactForm.get('user').value
    };
    
      console.log(contact);
      this.contactsUrl = "http://localhost:8080/api/contacts";
      this.http.post(this.contactsUrl, contact)
      .subscribe(data => {
      // console.log('User logged in: ', data);
      alert(`Contact named: ${contact.firstName} was added!`);
    });
  }
  ngOnInit() {
  }

}
