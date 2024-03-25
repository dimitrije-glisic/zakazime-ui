import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth.service';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.css']
})
export class BusinessDashboardComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // workaround - fix this later
    this.authService.initializeUserState();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
