import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  mockServices: Service[] = [
    {
      name: 'Musko sisanje',
      price: 500,
      avgDuration: 30,
      category: 'Sisanje'

    },
    {
      name: 'Zensko sisanje',
      price: 1000,
      avgDuration: 60,
      category: 'Sisanje'
    },
    {
      name: 'Depilacija',
      note: 'Depilacija nogu',
      price: 500,
      avgDuration: 30,
      category: 'Depilacija'
    },
    {
      name: 'Geliranje noktiju',
      price: 1000,
      avgDuration: 60,
      category: 'Nokti'
    }
  ]

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

  getServices(): Observable<Service[]> {
    return new Observable<Service[]>(subscriber => {
      return subscriber.next(this.mockServices);
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


  loadMockServices(): Observable<Service[]> {
    return this.http.get<Service[]>('assets/predefined-services.json');
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
      if(element.name === service.name) this.mockServices[index] = service;
    });

    return new Observable<boolean>(subscriber => {
      setTimeout(() => {
        subscriber.next(true);
      }, 800);
    });

  }

}
