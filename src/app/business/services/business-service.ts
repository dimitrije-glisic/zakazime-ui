import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Business } from 'src/app/interfaces/business.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  mockBusiness: Business[] = [
    {
      name: 'Business 1',
      phone: '1234567890',
      city: 'City 1',
      postalCode: '12345',
      address: 'Address 1',
      status: 'Active',
      ownerEmail: 'Owner 1'
    },
    {
      name: 'Business 2',
      phone: '1234567890',
      city: 'City 2',
      postalCode: '12345',
      address: 'Address 2',
      status: 'Active',
      ownerEmail: 'Owner 2'
    }
  ]

  constructor(private http: HttpClient) { }

  getBusiness(): Observable<Business | null> {
    //handle 404
    return this.http.get<Business>('/api/business').pipe(
      catchError(err => {
        if (err.status === 404) {
          // Handle the 404 error
          return of(null); // Return null in case of 404 error
        }
        return throwError(() => err);
      })
    );
  }

  createBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>('/api/business', business);
  }

  getBusinessesMock(): Observable<Business[]> {
    return new Observable<Business[]>(subscriber => {
      return subscriber.next(this.mockBusiness);
    });
  }

}
