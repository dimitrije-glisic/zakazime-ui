import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {BusinessType} from "../../interfaces/business-type.interface";
import {Business} from "../../interfaces/business";
import {Service} from "../../interfaces/service";
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private business: Business | null = null;
  private services: Service[] = [];

  constructor(private http: HttpClient) {
  }

  getBusiness(): Observable<Business> {
    if (this.business) {
      return of(this.business); // Return cached value if available
    }
    console.log('contacting server for business');
    return this.http.get<Business>('/api/business').pipe(
      tap(business => this.business = business), // Cache the response
      catchError(err => {
        if (err.status === 404) {
          throw new Error('No business found');
        }
        return throwError(() => err);
      })
    );
  }

  createBusiness(createBusinessProfileRequest: CreateBusinessProfileRequest): Observable<Business> {
    return this.http.post<Business>('/api/business', createBusinessProfileRequest);
  }

  getBusinessTypes(): Observable<BusinessType[]> {
    return this.http.get<BusinessType[]>('/api/business-types');
  }

  setServices(services: Service[]) {
    if (this.business && this.business.id) {
      this.loadServices(this.business.id)
    }
  }

  loadServices(id: number) {
    // this.businessController.getServicesOfBusiness(id).subscribe(
    this.http.get<Service[]>('/api/business/' + id + '/services').subscribe(
      (services: Service[]) => {
        this.services = services;
      },
      (error: any) => {
        // Handle the error appropriately
        console.error('Error fetching services:', error);
      }
    );
  }

  addServicesLocally(services: Service[]) {
    if (this.business) {
      this.services.push(...services);
    }
  }

  updateServiceLocally(service: Service) {
    if (this.business) {
      this.services.forEach((element: { title: any; }, index: number) => {
        if (element.title === service.title) {
          this.services[index] = service;
        }
      });
    }
  }

  getServicesOfBusiness(id: number) {
    return this.http.get<Service[]>('/api/business/' + id + '/services');
  }
}
