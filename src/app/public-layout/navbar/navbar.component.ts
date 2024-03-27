import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.initializeUserState();
  }


  logout() {
    // this.authService.logout(this.router.navigateByUrl('/'));
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
