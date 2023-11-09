import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const expectedRole = route.data['expectedRole'];
    // const userRole = this.authService.getUserRole();

    // if (userRole === expectedRole) {
    //   return true;
    // }

    // this.router.navigate(['/error']);
    // return false;
    return true;
  }
}
