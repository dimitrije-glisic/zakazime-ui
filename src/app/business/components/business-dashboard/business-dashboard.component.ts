import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth.service';
import {FooterControlService} from "../../../shared/footer-control.service";

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.css']
})
export class BusinessDashboardComponent implements OnInit, OnDestroy {

  constructor(public authService: AuthService, private router: Router,
              private footerControlService: FooterControlService) {
  }

  ngOnInit(): void {
    this.authService.initializeUserState();
    this.footerControlService.hideFooter();
  }

  ngOnDestroy(): void {
    this.footerControlService.displayFooter();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
