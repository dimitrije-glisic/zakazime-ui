import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { RegistrationComponent } from 'src/app/registration-login/registration/registration.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  registrationType: any;

  constructor(private dialog: MatDialog, public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.setInitialLoginState();
  }

  openSignUpDialog() {
    this.dialog.open(RegistrationComponent, {
      width: '500px',
      height: '500px',
      data: { 'registrationType': this.registrationType }
    });

  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
