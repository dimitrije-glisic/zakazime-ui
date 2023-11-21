import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private business: Business | null = null;

  constructor(private http: HttpClient) { }

  getBusiness(): Observable<Business | null> {
    if (this.business) {
      return of(this.business); // Return cached value if available
    }
    console.log('contacting server for business');
    return this.http.get<Business>('/api/business').pipe(
      tap(business => this.business = business), // Cache the response
      catchError(err => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(() => err);
      })
    );  
  }

  createBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>('/api/business', business);
  }

  getBusinessTypes(): Observable<string[]> {
    return this.http.get<string[]>('/api/business/types');
  }

  setServices(services: Service[]) {
    if (this.business) {
      this.business.services = services;
    }
  }

  addServicesLocally(userSelectedServices: Service[]) {
    if (this.business) {
      this.business.services.push(...userSelectedServices);
    }
  }

}
