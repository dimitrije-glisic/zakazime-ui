import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {BusinessService} from './business/services/business-service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsBusinessUser implements CanActivate {

  constructor(private router: Router, private businessService: BusinessService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('FinishedRegistrationGuard#canActivate called');
    return this.businessService.getBusinessCached().pipe(
      map(business => {
        if (business) {
          return true;
        } else {
          console.log('Business not found');
          this.router.navigate(['/home']);
          return false;
        }
      }),
      catchError(() => {
        console.log('Error while loading business');
        this.router.navigate(['/error']); // navigate to a general error handling route
        return of(false);
      })
    );
  }

}
