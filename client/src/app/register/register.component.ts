import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface RegisterModel{
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends DialogComponent<RegisterModel, boolean> implements RegisterModel {
  model: any = {};
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  registerForm;

  
  constructor(private formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
    this.createForm();
   }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    });
  }

  onRegisterSubmit() {
    const user = {
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      phoneNumber: this.registerForm.get('phoneNumber').value,
      password: this.registerForm.get('password').value,
      confirmPassword: this.registerForm.get('confirmPassword').value,
    };
    console.log(user);
 }
confirm(){
  this.result = true;
  this.close();
}
}
