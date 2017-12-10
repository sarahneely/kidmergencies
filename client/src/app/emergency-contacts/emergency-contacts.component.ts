import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.component.html',
  styleUrls: ['./emergency-contacts.component.css'],
  providers: [LoginComponent]
})
export class EmergencyContactsComponent implements OnInit {
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  image: string;
  user: string;
  contactForm;
  count: number = 0;
  contactsUrl: any;
  contacts: any = [];
  contact: any;
  users_contacts: any;
  contacts_array: any;
  allUserContactsUrl: string;
  token: string = localStorage.getItem('token');
  private headers: Headers = new Headers();
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private login: LoginComponent) { 
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
      user: localStorage.getItem('id')
      // user: this.contactForm.get('user').value
    };
    console.log('user: ', this.user);
    
      console.log(contact);
      this.contactsUrl = "http://localhost:8080/api/contacts";
      this.http.post(this.contactsUrl, contact, 
        {
          headers: new HttpHeaders() 
          .set('authorization', localStorage.getItem('token')) 
          .set('Content-Type', 'application/json')
        })
      .subscribe(data => {
      console.log('User logged in: ', data);
      // Need to add user to this array too! 
      alert(`Contact named: ${contact.firstName} was added!`);
    });
  }
  onFileChange($event){
    let file = $event.target.files[0];
    this.contactForm.controls['image'].setValue(file ? file.name : '');
  }
  getContacts(){
    this.allUserContactsUrl = `http://localhost:8080/api/contacts/`;
    this.http.get(this.allUserContactsUrl,  
      {
        headers: new HttpHeaders() 
        .set('authorization', localStorage.getItem('token')) 
        .set('Content-Type', 'application/json')
      })
    .subscribe(data => {

      console.log('data', data);
      for(let i of Object.keys(data)){
        if(data[i].user === localStorage.getItem('id'))
        {
          this.count++;
          let temp = data[i];
          this.contacts.push(temp);
        }

      }
      console.log('this.contacts', this.contacts);
        // for(let j=0;j<this.count;j++)
        // {
        //    this.contact = this.contacts_array[j];
        //    console.log('this.contact', this.contact);
        // }
      // this.contacts = data;
      // this.contact = this.contacts[this.count];
      for(let i=0;i<this.count;i++)
      {
        this.contact = this.contacts[i];
      }
      // console.log(this.count);
      });
  }
  ngOnInit() {
    this.getContacts();
  }

}
