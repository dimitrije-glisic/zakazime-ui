import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegistrationRequest} from "../../interfaces/registration-request";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const userData: RegistrationRequest = this.registerForm.value;
      console.log('Registering user', userData);
      this.authService.registerUser(userData).subscribe({
        next: response => {
          console.log('Registration successful', response);
        },
        error: error => {
          console.log('registration failed', error);
          if (error && error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Registration failed.';
          }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  private handleSuccessfulBusinessRegistration() {
    this.router.navigate(['/finish-registration'], {queryParams: {email: this.registerForm.value.email}});
  }

  private handleSuccessfulUserRegistration() {
  }

}

export const REGISTRATION_TYPE_SERVICE_PROVIDER = 'SERVICE_PROVIDER';
export const REGISTRATION_TYPE_CUSTOMER = 'CUSTOMER';
