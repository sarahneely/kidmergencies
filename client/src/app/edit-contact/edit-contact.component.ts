import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmergencyContactsComponent } from '../emergency-contacts/emergency-contacts.component';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface EditContactModel {
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  image: string;
  user: string;
}
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent extends DialogComponent<EditContactModel, boolean> implements EditContactModel {
  model: any = {};  
  phone: string;
  firstName: string;
  lastName: string;
  relationship: string;
  image: string;
  user: string;
  contactForm;
  editContactUrl: string;  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, 
    dialogService: DialogService) { 
      super(dialogService)
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
    const contact = {
      phone: this.contactForm.get('phone').value,
      firstName: this.contactForm.get('firstName').value,
      lastName: this.contactForm.get('lastName').value,
      relationship: this.contactForm.get('relationship').value,
      image: this.contactForm.get('image').value,
      user: localStorage.getItem('id')
    };

    this.editContactUrl = 'http://localhost:8080/api/contacts/5a0d0b0f5414890a54fca60f';
    this.http.put(this.editContactUrl, contact,
      {
        headers: new HttpHeaders() 
        .set('authorization', localStorage.getItem('token')) 
        .set('Content-Type', 'application/json')
      })
    // .map(data => {
    //   console.log('data in map: ', data)
    // })
    .subscribe(data => {
      console.log('data: ', data);
    });
  }

  // confirm(){
  //   this.result = true;
  //   this.close();
  // }

//   editContact(){
//     this.editContactUrl = `http://localhost:8080/api/contacts/${this.contact_id}`; 
//     this.http.get(this.editContactUrl,  
//       {
//         headers: new HttpHeaders() 
//         .set('authorization', localStorage.getItem('token')) 
//         .set('Content-Type', 'application/json')
//       })
//     .subscribe(data => {
      
//   });
// }
}
