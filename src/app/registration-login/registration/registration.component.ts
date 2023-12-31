import {Component, Inject} from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegistrationRequest} from 'src/app/interfaces/registration-dto.interface';

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
    private dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
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
      const registrationType = this.data.registrationType;
      userData.role = registrationType;
      console.log('Registering user', userData);
      this.authService.registerUser(userData).subscribe({
        next: response => {
          console.log('Registration successful', response);
          if (registrationType === REGISTRATION_TYPE_SERVICE_PROVIDER) {
            this.handleSuccessfulBusinessRegistration();
          } else if (registrationType === REGISTRATION_TYPE_CUSTOMER) {
            this.handleSuccessfulUserRegistration();
          }
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
    this.dialogRef.close();
    this.router.navigate(['/finish-registration'], {queryParams: {email: this.registerForm.value.email}});
  }

  private handleSuccessfulUserRegistration() {
    this.dialogRef.close();
  }

}

export const REGISTRATION_TYPE_SERVICE_PROVIDER = 'SERVICE_PROVIDER';
export const REGISTRATION_TYPE_CUSTOMER = 'CUSTOMER';
