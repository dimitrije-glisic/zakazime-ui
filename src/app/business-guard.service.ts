import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  SERVICE_PROVIDER_ROLE = 3;

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    let currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.roleId === this.SERVICE_PROVIDER_ROLE) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
