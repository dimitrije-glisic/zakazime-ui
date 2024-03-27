import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {FooterControlService} from "../../../shared/footer-control.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy{
  isLoggedInSubject: Observable<boolean> | undefined;

  constructor(protected authService: AuthService, protected router: Router,
              private footerControlService: FooterControlService) {
  }

  ngOnInit(): void {
    // workaround - fix this later
    this.authService.initializeUserState();
    let loggedIn = this.authService.isLoggedIn();
    this.isLoggedInSubject = of(loggedIn);
    this.footerControlService.hideFooter();
  }

  ngOnDestroy() {
    this.footerControlService.displayFooter();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
