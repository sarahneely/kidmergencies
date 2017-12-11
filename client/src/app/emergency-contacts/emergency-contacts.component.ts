import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

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
  contact_id: any;
  allUserContactsUrl: string;
  editContactUrl: string;
  token: string = localStorage.getItem('token');
  private headers: Headers = new Headers();
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private login: LoginComponent, private dialogService:DialogService) { 
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
    };
    console.log('image: ', contact.image);
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
        this.contact_id = data[i]._id;
        if(data[i].user === localStorage.getItem('id'))
        {
          this.count++;
          let temp = data[i];
          this.contacts.push(temp);
        }
      }
      for(let i=0;i<this.count;i++)
      {
        this.contact = this.contacts[i];
        this.contact_id = this.contacts[i].contact_id;
      }
      });
  }
  edit(){
    // let disposable = this.dialogService.addDialog(EditContactComponent, { })    
    this.editContactUrl = `http://localhost:8080/api/contacts/${this.contact_id}`;
    console.log("this.contact: ", this.contact);
    this.http.put(this.editContactUrl, this.contact,
      {
        headers: new HttpHeaders() 
        .set('authorization', localStorage.getItem('token')) 
        .set('Content-Type', 'application/json')
      })
    // .map(data => {
    //   console.log('data in map: ', data);    
    // })    
    .subscribe(data => {
      console.log('data: ', data);
    });
  }

  ngOnInit() {
    this.getContacts();
  }

}
