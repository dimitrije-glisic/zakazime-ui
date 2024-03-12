import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from "../../interfaces/service";
import {AppointmentService} from "../services/appointment.service";
import {Business} from "../../interfaces/business";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // private selectedServices: Service[] = [];
  private selectedDate: Date | undefined;
  private selectedTime: string | undefined;
  private businessId: string = '';
  private business: Business | undefined;
  private selectedEmployeeId: number | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private appointmentService: AppointmentService) {
  }

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
    this.selectedDate = date;
  }

  getSelectedDate() {
    return this.selectedDate ? this.selectedDate : new Date();
  }

  setSelectedTime(time: string) {
    this.selectedTime = time;
  }

  getSelectedTime() {
    return this.selectedTime;
  }

  setBusinessId(id: string) {
    if (this.businessId && this.businessId !== id) {
      this.setSelectedServices([]);
    }
    this.businessId = id;
  }

  setBusiness(business: Business) {
    this.business = business;
  }

  getBusiness() {
    return this.business;
  }

  getBusinessId() {
    return this.businessId;
  }

  navigateToTimePicker() {
    this.router.navigate(['booking', this.businessId, 'pick-time'], {relativeTo: this.activatedRoute});
  }

  navigateToConfirmBooking() {
    this.router.navigate(['booking', this.businessId, 'confirm-booking'], {relativeTo: this.activatedRoute});
  }

  getEmployeeId() {
    // todo
    return 5;
  }

  setSelectedEmployeeId(id: number) {
    this.selectedEmployeeId = id;
  }

  getSelectedEmployeeId() {
    return this.selectedEmployeeId;
  }
}
