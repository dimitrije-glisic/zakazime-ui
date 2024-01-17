import {Component} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(protected authService: AuthService, protected router: Router) {
  }

  ngOnInit(): void {
    // workaround - fix this later
    this.authService.setInitialLoginState();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

}
