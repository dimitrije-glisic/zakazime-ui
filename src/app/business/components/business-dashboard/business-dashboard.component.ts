import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.css']
})
export class BusinessDashboardComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.setInitialLoginState();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
