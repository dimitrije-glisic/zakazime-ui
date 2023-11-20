import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, take, tap, throwError } from 'rxjs';
import { Service } from './interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  mockServices: Service[] = [];

  services: Service[] = [];

  constructor(private http: HttpClient) { }

  createService(service: Service): Observable<boolean> {
    this.mockServices.push(service);
    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 800);
    });
  }

  createServices(services: Service[], businessName: string) {
    return this.http.post(`/api/business/${businessName}/services`, services).pipe(
      tap(() => {
        this.services.push(...services);
      }
      ),
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

    return this.http.get<Service[]>(`/api/business/${name}/services`).pipe(
      tap(services => {
        this.services = services;
      }),
    );
  }



  getServiceByName(name: string) {
    return new Observable<Service>(subscriber => {
      const service = this.mockServices.find(service => service.name === name);
      if (service) {
        subscriber.next(service);
      } else {
        subscriber.error('Service not found');
      }
    });
  }

  updateService(service: Service) {
    //update service 'service'
    this.mockServices.forEach((element, index) => {
      if (element.name === service.name) this.mockServices[index] = service;
    });

    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 800);
    });

  }

  getServiceTemplatesForBusinessType(type: String): Observable<Service[]> {
    return this.http.get<Service[]>(`/api/business/types/${type}/services`).pipe(
      // tap(business => this.business = business)
      catchError(err => {
        if (err.status === 404) {
          console.log('No services found for business type ' + type);
        }
        return throwError(() => err);
      })
    );
  }

}
