import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  REGISTRATION_TYPE_CUSTOMER,
  RegistrationComponent
} from 'src/app/registration-login/registration/registration.component';
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
  registrationType = REGISTRATION_TYPE_CUSTOMER;

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
