import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Account} from "../../interfaces/account";


@Component({
  selector: 'app-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response: Account) => this.handleSuccessfulLogin(response),
        error: (error: any) => this.handleLoginError(error)
      });
    }
  }

  private handleSuccessfulLogin(response: Account): void {
    this.navigateToDashboard(response.roleId);
  }

  private handleLoginError(error: any): void {
    // Here you can check the error status code and set the error message accordingly
    if (error.status === 401) {
      this.errorMessage = 'Invalid credentials';
    } else {
      this.errorMessage = 'An error occurred during login. Please try again later.';
    }
  }

  navigateToDashboard(role: number | undefined): void {
    console.log('role: ' + role);
    switch (role) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/manage-business']);
        break;
      case 3:
        this.router.navigate(['/home']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

}
