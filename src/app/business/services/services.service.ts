import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, switchMap, tap, throwError} from 'rxjs';
import {Service} from "../../interfaces/service";
import {BusinessTypeService} from "./business-type.service";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  businessTypeToServicesMap: Map<number, Service[]> = new Map<number, Service[]>();
  services: Service[] = [];

  constructor(private http: HttpClient, private businessTypeService: BusinessTypeService) {
  }

  createService(service: Service, businessId: number) {
    return this.http.post(`/api/business/${businessId}/single-service`, service).pipe(
      catchError(err => {
          if (err.status === 404) {
            console.log('No services found for business type ' + businessId);
          }
          return throwError(() => err);
        }
      )
    );
  }

  createServices(services: Service[], businessId: number) {
    return this.http.post(`/api/business/${businessId}/services`, services).pipe(
      catchError(err => {
          if (err.status === 404) {
            console.log('No services found for business type ' + businessId);
          }
          return throwError(() => err);
        }
      )
    );
  }

  getServices(name: string): Observable<Service[]> {
    if (this.services.length > 0) {
      return new Observable<Service[]>(subscriber => {
        return subscriber.next(this.services);
      });
    }

    console.log('calling getServices in services.service.ts');
    return this.http.get<Service[]>(`/api/business/${name}/services`).pipe(
      tap(services => {
        this.services = services;
      }),
    );
  }

  updateService(service: Service) {
    return this.http.put(`/api/business/${service.businessId}/services/${service.id}`, service).pipe(
      catchError(err => {
          return throwError(() => err);
        }
      )
    );
  }

  getServiceTemplatesForBusinessType(typeId: number): Observable<Service[]> {

    if (this.businessTypeToServicesMap.has(typeId)) {
      return new Observable<Service[]>(subscriber => {
        return subscriber.next(this.businessTypeToServicesMap.get(typeId)!);
      });
    }

    return this.businessTypeService.findBusinessTypeById(typeId).pipe(
      switchMap((businessType) => this.searchServiceTemplates(businessType.title)),
      catchError(err => {
        if (err.status === 404) {
          console.log('No services found for business type ' + typeId);
        }
        return throwError(() => err);
      })
    );
  }

  searchServiceTemplates(businessTypeName: string): Observable<Service[]> {
    return this.http.get<Service[]>(`/api/service-templates?businessType=${businessTypeName}`).pipe(
      catchError(err => {
        if (err.status === 404) {
          console.log('No services found for business type ' + businessTypeName);
        }
        return throwError(() => err);
      })
    );
  }

}
