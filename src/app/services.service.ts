import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Business } from './interfaces/business.interface';
import { Service } from './interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  mockBusiness: Business[] = [
    {
      name: 'Business 1',
      phoneNumber: '1234567890',
      city: 'City 1',
      postalCode: '12345',
      address: 'Address 1',
      status: 'Active',
      ownerEmail: 'Owner 1'
    },
    {
      name: 'Business 2',
      phoneNumber: '1234567890',
      city: 'City 2',
      postalCode: '12345',
      address: 'Address 2',
      status: 'Active',
      ownerEmail: 'Owner 2'
    }
  ]

  mockServices: Service[] = [];

  constructor(private http: HttpClient) { }

  getBusiness(): Observable<Business> {
    return this.http.get<Business>('/api/business');
  }

  createBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>('/api/business', business);
  }

  getBusinesses(): Observable<Business[]> {
    return new Observable<Business[]>(subscriber => {
      return subscriber.next(this.mockBusiness);
    });
  }

  createService(service: Service): Observable<boolean> {
    this.mockServices.push(service);
    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 800);
    });
  }

  createServices(userSelectedServices: Service[]) {
    for (const service of userSelectedServices) {
      this.mockServices.push(service);
    }
    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 800);
    });
  }

  getServices(): Observable<Service[]> {
    if (this.mockServices.length > 0) {
      return new Observable<Service[]>(subscriber => {
        return subscriber.next(this.mockServices)
      });
    } else {
      return this.http.get<Service[]>('assets/predefined-services.json').pipe(
        tap(services => {
          this.mockServices = services;
        }),
      );
    }
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

}
