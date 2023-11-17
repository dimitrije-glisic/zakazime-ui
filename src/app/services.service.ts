import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Service } from './interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  mockServices: Service[] = [];

  constructor(private http: HttpClient) { }

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
