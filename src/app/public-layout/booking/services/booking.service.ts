import {Injectable} from '@angular/core';
import {Service} from "../../../interfaces/service";
import {Business} from "../../../interfaces/business";
import {Employee} from "../../../interfaces/employee";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // private selectedServices: Service[] = [];
  private selectedDate: Date | undefined;
  private selectedTime: string | undefined;
  private business: Business | undefined;
  private selectedEmployee: Employee | undefined;

  addService(service: Service) {
    const selectedServices = this.getSelectedServices();
    selectedServices.push(service);
    localStorage.setItem('services', JSON.stringify(selectedServices));
  }

  removeService(service: Service) {
    const selectedServices = this.getSelectedServices();
    const index = selectedServices.findIndex(s => s.id === service.id);
    if (index > -1) {
      selectedServices.splice(index, 1);
      localStorage.setItem('services', JSON.stringify(selectedServices));
    }
  }

  setSelectedServices(services: Service[]) {
    localStorage.setItem('services', JSON.stringify(services));
  }

  getSelectedServices(): Service[] {
    return JSON.parse(localStorage.getItem('services') || '[]');
  }

  setSelectedDate(date: Date) {
    // this.selectedDate = date;
    localStorage.setItem('date', date.toISOString());
  }

  getSelectedDate() {
    // return this.selectedDate ? this.selectedDate : new Date();
    return new Date(localStorage.getItem('date') || new Date().toISOString());
  }

  setSelectedTime(time: string) {
    // this.selectedTime = time;
    localStorage.setItem('time', time);
  }

  getSelectedTime() {
    // return this.selectedTime;
    return localStorage.getItem('time') || '';
  }

  setBusiness(business: Business) {
    // this.business = business;
    localStorage.setItem('business', JSON.stringify(business));
  }

  getBusiness() {
    // return this.business;
    return JSON.parse(localStorage.getItem('business') || '{}');
  }

  setSelectedEmployee(employee: Employee) {
    // this.selectedEmployee = employee;
    localStorage.setItem('employee', JSON.stringify(employee));
  }

  getSelectedEmployee() {
    // return this.selectedEmployee;
    return JSON.parse(localStorage.getItem('employee') || '{}');
  }

  setSelectedService2EmployeeMap(map: Map<number, Employee | undefined>) {
    console.log('setSelectedServiceEmployeePair', map);
    localStorage.setItem('service-employee-pair', JSON.stringify(Array.from(map.entries())));
  }

  getSelectedService2EmployeeMap(): Map<number, Employee | undefined> {
    console.log('getSelectedServiceEmployeePair');
    const entries = JSON.parse(localStorage.getItem('service-employee-pair') || '[]');
    console.log('entries', entries);
    // to be in the same order as we see in UI
    entries.reverse();
    return new Map<number, Employee | undefined>(entries);
  }

  reset() {
    localStorage.removeItem('services');
    localStorage.removeItem('date');
    localStorage.removeItem('time');
    localStorage.removeItem('business');
    localStorage.removeItem('employee');
    localStorage.removeItem('service-employee-pair');
  }
}
