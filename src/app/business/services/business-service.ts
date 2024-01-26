import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import {Business} from "../../interfaces/business";
import {Service} from "../../interfaces/service";
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";
import {SubcategoryService} from "./subcategory.service";
import {ServiceSubcategory} from "../../interfaces/service-subcategory";
import {BusinessType} from "../../interfaces/business-type";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {MessageResponse} from "../../interfaces/message-response";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private business: Business | null = null;
  private services: Service[] | null = null;
  private subcategories: ServiceSubcategory[] | undefined;

  constructor(private http: HttpClient, private subcategoryService: SubcategoryService) {
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

  loadSubcategories(subcategoryIds: Set<number>): Observable<ServiceSubcategory[]> {
    console.log('loading subcategories');
    if (!subcategoryIds || subcategoryIds.size === 0) {
      return throwError(() => new Error('No filter provided'));
    }

    if (this.subcategories) {
      return of(this.subcategories.filter(subcategory => subcategoryIds.has(subcategory.id)));
    }

    return this.subcategoryService.getAll().pipe(
      map(subcategories => {
        const filter = new Set(subcategoryIds);
        return subcategories.filter(subcategory => filter.has(subcategory.id));
      }),
      tap(subcategories => this.subcategories = subcategories),
      catchError(err => {
        // Handle different error scenarios here
        console.error('Error occurred while fetching subcategories', err);
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

  getSubcategories(): ServiceSubcategory[] {
    if (!this.subcategories) throw new Error('Subcategories is null when getting subcategories');
    return this.subcategories;
  }

  loadPredefinedCategories(id: number) {
    return this.http.get<PredefinedCategory[]>('/api/business/' + id + '/predefined-categories');
  }

  savePredefinedCategories(id: number, categories: PredefinedCategory[]) {
    const ids = categories.map(category => category.id);
    return this.http.post<MessageResponse>('/api/business/' + id + '/predefined-categories', ids);
  }
}
