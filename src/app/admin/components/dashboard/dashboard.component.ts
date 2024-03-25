import {Component} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLoggedInSubject: Observable<boolean> | undefined;

  constructor(protected authService: AuthService, protected router: Router) {
  }

  ngOnInit(): void {
    // workaround - fix this later
    this.authService.initializeUserState();
    let loggedIn = this.authService.isLoggedIn();
    this.isLoggedInSubject = of(loggedIn);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
