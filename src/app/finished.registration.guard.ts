import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { BusinessService } from './business/services/business-service';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinishedRegistrationGuard implements CanActivate {

  constructor(private router: Router, private businessService: BusinessService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.businessService.getBusiness().pipe(
      map(business => {
        if (business) {
          return true;
        } else {
          this.router.navigate(['/finish-registration']);
          return false;
        }
      }),
      catchError(() => {
        // Handle other errors
        this.router.navigate(['/error']); // navigate to a general error handling route
        return of(false);
      })
    );

  }

}
