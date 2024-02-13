import { ApplicationRef, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  REGISTRATION_TYPE_CUSTOMER,
  RegistrationComponent
} from 'src/app/registration-login/registration/registration.component';
import { AuthService } from "../../../auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {
  registrationType = REGISTRATION_TYPE_CUSTOMER;

  // make bellow fields as @Input() and pass them from parent component

  // backgroundImg = '/assets/images/gradient.jpeg';
  // title = 'Dobrodosli na ZakaziMe';
  // subtitle = 'Pronadjite najbolju uslugu za svoje potrebe';

  @Input() backgroundImg: string | undefined;
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;

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
