import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerData} from "../../interfaces/customer-data";
import {Customer} from "../../interfaces/customer";
import {CustomerRichObject} from "../../interfaces/customer-rich-object";
import {AppointmentService} from "../../public-layout/booking/services/appointment.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  rootPath = '/api/business/{businessId}/customers';

  constructor(private http: HttpClient, private appointmentService: AppointmentService) {
  }

  createCustomer(businessId: number, customer: CustomerData) {
    const path = this.rootPath.replace('{businessId}', businessId.toString());
    return this.http.post(path, customer);
  }

  getCustomers(businessId: number) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/all';
    return this.http.get<Customer[]>(path);
  }

  getCustomer(businessId: number, customerId: number) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + customerId;
    return this.http.get<Customer>(path);
  }

  updateCustomer(businessId: number, customerId: number, customer: CustomerData) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + customerId;
    return this.http.put(path, customer);
  }

  getCustomerFull(businessId: number, customerId: number): Observable<CustomerRichObject> {
    const customerFull: CustomerRichObject = {
      customerData: {} as Customer,
      appointments: []
    };

    return new Observable<CustomerRichObject>(subscriber => {
      this.getCustomer(businessId, customerId).subscribe(customer => {
        customerFull.customerData = customer;
        this.appointmentService.getAppointmentsForCustomer(businessId, customerId).subscribe(appointments => {
          customerFull.appointments = appointments;
          subscriber.next(customerFull);
        });
      });
    });

  }

}
