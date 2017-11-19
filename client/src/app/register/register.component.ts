import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm;

  constructor(private formBuilder: FormBuilder) {
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
}
