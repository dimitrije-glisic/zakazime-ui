import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {Business} from "../../interfaces/business";
import {Service} from "../../interfaces/service";
import {CreateBusinessProfileRequest} from "../../interfaces/create-business-profile-request";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {MessageResponse} from "../../interfaces/message-response";
import {UserDefinedCategory} from "../../interfaces/user-defined-category";
import {UserDefinedCategoryService} from "./user-defined-category.service";
import {BusinessRichObject} from "../../interfaces/business-rich-object";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private business: Business | null = null;
  private services: Service[] | null = null;
  private userDefinedCategories: UserDefinedCategory[] | undefined;
  private allBusinesses: Business[] | undefined;

  constructor(private http: HttpClient, private userDefinedCategoryService: UserDefinedCategoryService) {
  }

  getBusinessCached(): Observable<Business | undefined> {
    if (this.business) {
      return of(this.business); // Return cached value if available
    }
    return this.loadBusiness();
  }

  loadBusiness(): Observable<Business> {
    console.log('contacting server for business');
    return this.http.get<Business>('/api/business').pipe(
      tap(business => this.business = business), // Cache the response
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  createBusiness(createBusinessProfileRequest: CreateBusinessProfileRequest): Observable<Business> {
    return this.http.post<Business>('/api/business', createBusinessProfileRequest);
  }

  getServices(): Observable<Service[]> {
    if (this.services) {
      return of(this.services);
    }
    return this.loadServices();
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

  loadPredefinedCategories(id: number) {
    return this.http.get<PredefinedCategory[]>('/api/business/' + id + '/predefined-categories');
  }

  savePredefinedCategories(id: number, categories: PredefinedCategory[]) {
    const ids = categories.map(category => category.id);
    return this.http.post<MessageResponse>('/api/business/' + id + '/predefined-categories', ids);
  }

  loadServices() {
    return this.http.get<Service[]>('/api/business/' + this.business!.id! + '/services').pipe(
      tap(services => this.services = services),
      catchError(err => {
        if (err.status === 404) {
          throw new Error('No services found');
        }
        return throwError(() => err);
      })
    );
  }

  addService(service: Service) {
    return this.http.post<Service>('/api/business/' + this.business!.id! + '/single-service', service).pipe(
      catchError(err => {
        console.error('Error occurred while adding service', err);
        return throwError(() => err);
      })
    );
  }

  updateService(service: Service) {
    return this.http.put<Service>('/api/business/' + this.business!.id! + '/services/' + service.id, service).pipe(
      catchError(err => {
        console.error('Error occurred while updating service', err);
        return throwError(() => err);
      })
    );
  }

  deleteService(serviceId: number) {
    return this.http.delete('/api/business/' + this.business!.id! + '/services/' + serviceId).pipe(
      catchError(err => {
        console.error('Error occurred while deleting service', err);
        return throwError(() => err);
      })
    );
  }

  //not used - could be removed probably
  getAll() {
    return this.http.get<Business[]>('/api/business/all');
  }

  getAllActive() {
    return this.http.get<Business[]>('/api/business/all-active');
  }

  getAllCached(): Observable<Business[]> {
    if (this.allBusinesses) {
      return of(this.allBusinesses);
    }
    return this.getAllActive();
  }

  searchBusinesses(city: string, businessType: string | undefined, category: string | undefined) {
    //city, businessType, category should be url parameters and not part of the path
    return this.http.get<Business[]>('/api/business/search?city=' + city + '&businessType=' + businessType + (category ? '&category=' + category : ''));
  }

  getBusinessesInCity(city: string) {
    return this.http.get<Business[]>(`/api/business/all/${city}`);
  }

  uploadProfileImage(id: number, image: File) {
    console.log('uploading image');
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<MessageResponse>('/api/business/' + id + '/upload-image?imageType=PROFILE', formData);
  }

  loadRichBusinessObject(city: string, businessName: string): Observable<BusinessRichObject> {
    return this.http.get<BusinessRichObject>('/api/business/' + city + '/' + businessName);
  }

  submitBusiness(id: number) {
    return this.http.post<MessageResponse>('/api/business/' + id + '/submit', {});
  }
}
