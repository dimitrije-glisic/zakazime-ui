import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from "../../openapi";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private selectedServices: Service[] = [];
  private selectedDate: Date | null = null;
  private selectedTime: string | null = null;
  private businessId: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  addService(service: Service) {
    this.selectedServices.push(service);
  }

  removeService(service: Service) {
    this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
  }

  setSelectedServices(services: Service[]) {
    this.selectedServices = services;
  }

  getSelectedServices() {
    return this.selectedServices;
  }

  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

  getSelectedDate() {
    return this.selectedDate;
  }

  setSelectedTime(time: string) {
    this.selectedTime = time;
  }

  getSelectedTime() {
    return this.selectedTime;
  }

  setBusinessId(id: string) {
    this.businessId = id;
  }

  getBusinessId() {
    return this.businessId;
  }

  navigateToTimePicker() {
    this.router.navigate(['booking', this.businessId, 'pick-time'], { relativeTo: this.activatedRoute });
  }

  navigateToConfirmBooking() {
    this.router.navigate(['booking', this.businessId, 'confirm-booking'], { relativeTo: this.activatedRoute });
  }
}
