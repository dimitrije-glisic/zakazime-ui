import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {Business} from "../../interfaces/business";
import {Service} from "../../interfaces/service";
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";
import {ServiceSubcategory} from "../../interfaces/service-subcategory";
import {BusinessType} from "../../interfaces/business-type";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {MessageResponse} from "../../interfaces/message-response";
import {UserDefinedCategory} from "../../interfaces/user-defined-category";
import {UserDefinedCategoryService} from "./user-defined-category.service";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private business: Business | null = null;
  private services: Service[] | null = null;
  private userDefinedCategories: UserDefinedCategory[] | undefined;

  constructor(private http: HttpClient, private userDefinedCategoryService: UserDefinedCategoryService) {
  }

  loadBusiness(): Observable<Business | undefined> {
    if (this.business) {
      return of(this.business); // Return cached value if available
    }
    console.log('contacting server for business');
    return this.http.get<Business>('/api/business').pipe(
      tap(business => this.business = business), // Cache the response
      catchError(err => {
        if (err.status === 404) {
          return of(undefined); // Return null if business not found
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

  loadServices(businessId: number): Observable<Service[]> {
    if (this.services) {
      return of(this.services);
    }
    return this.http.get<Service[]>('/api/business/' + businessId + '/services').pipe(
      tap(services => this.services = services),
      catchError(err => {
        if (err.status === 404) {
          throw new Error('No services found');
        }
        return throwError(() => err);
      })
    );
  }

  loadCategories(): Observable<UserDefinedCategory[]> {
    console.log('loading categories');

    if (this.userDefinedCategories) {
      return of(this.userDefinedCategories);
    }

    return this.userDefinedCategoryService.getAll(this.business!.id).pipe(
      catchError(err => {
        // Handle different error scenarios here
        console.error('Error occurred while fetching categories', err);
        return throwError(() => err);
      })
    );
  }

  addServicesLocally(services: Service[]) {
    if (!this.business) throw new Error('Business is null when adding services');
    if (!this.services) {
      this.services = services;
    } else {
      this.services = this.services.concat(services);
    }
  }

  updateServiceLocally(service: Service) {
    if (!this.business) throw new Error('Business is null when updating service');
    if (!this.services) throw new Error('Services is null when updating service');
    this.services.forEach((element: { id: number; }, index: number) => {
      if (element.id === service.id) {
        this.services![index] = service;
      }
    });
  }

  getService(id: string): Service {
    if (!this.business) throw new Error('Business is null when getting service');
    if (!this.services) throw new Error('Services is null when getting service');
    return <Service>this.services.find(service => service.id === Number(id));
  }


  loadPredefinedCategories(id: number) {
    return this.http.get<PredefinedCategory[]>('/api/business/' + id + '/predefined-categories');
  }

  savePredefinedCategories(id: number, categories: PredefinedCategory[]) {
    const ids = categories.map(category => category.id);
    return this.http.post<MessageResponse>('/api/business/' + id + '/predefined-categories', ids);
  }
}
