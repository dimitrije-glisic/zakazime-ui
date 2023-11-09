import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';


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
        next: (response: User) => this.handleSuccessfulLogin(response),
        error: (error: any) => this.handleLoginError(error)
      });
    }
  }

  private handleSuccessfulLogin(response: User): void {
    this.navigateToDashboard(response.role);
  }

  private handleLoginError(error: any): void {
    // Here you can check the error status code and set the error message accordingly
    if (error.status === 401) {
      this.errorMessage = 'Invalid credentials';
    } else {
      this.errorMessage = 'An error occurred during login. Please try again later.';
    }
  }

  navigateToDashboard(role: string): void {
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['/manage-users']);
        break;
      case 'SERVICE_PROVIDER':
        this.router.navigate(['/manage-business']);
        break;
      case 'CUSTOMER':
        this.router.navigate(['/home']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

}
