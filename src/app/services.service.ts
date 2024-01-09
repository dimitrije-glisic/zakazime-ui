import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Service} from "./openapi";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  mockServices: Service[] = [];

  services: Service[] = [];

  constructor(private http: HttpClient) {
  }

  createService(service: Service, businessName: string) {
    return this.createServices([service], businessName);
  }

  createServices(services: Service[], businessName: string) {
    return this.http.post(`/api/business/${businessName}/services`, services).pipe(
      catchError(err => {
          if (err.status === 404) {
            console.log('No services found for business type ' + businessName);
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

  getServiceTemplatesForBusinessType(type: String): Observable<Service[]> {
    return this.http.get<Service[]>(`/api/business/types/${type}/services`).pipe(
      tap(services => {
        console.log('getServiceTemplatesForBusinessType received services.services', services);
      }),
      catchError(err => {
        if (err.status === 404) {
          console.log('No services found for business type ' + type);
        }
        return throwError(() => err);
      })
    );
  }

}
