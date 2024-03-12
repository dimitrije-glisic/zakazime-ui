import {Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {AppointmentService} from "../../services/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {BusinessService} from "../../../business/services/business-service";
import {Service} from "../../../interfaces/service";
import {Employee} from "../../../interfaces/employee";
import {Business} from "../../../interfaces/business";

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrl: './booking-management.component.css'
})
export class BookingManagementComponent implements OnInit {

  availableSlots: string[] | undefined;
  business: Business | undefined;
  //will change to array of
  selectedService: Service | undefined;
  employeesForService: Employee[] | undefined;

  constructor(private bookingService: BookingService,
              private appointmentService: AppointmentService,
              private activatedRoute: ActivatedRoute,
              private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-name': businessName} = params;
      this.businessService.getBusinessesInCity(city).subscribe(
        businesses => {
          const business = businesses.find(b => this.formatName(b.name) === businessName);
          this.bookingService.setBusinessId(business!.id.toString());
          this.business = business;
          this.loadAvailableTimeSlots();
          this.selectedService = this.bookingService.getSelectedServices()[0];
          this.loadEmployeesForService(this.business?.id!, this.bookingService.getSelectedServices()[0].id);
        }
      );
    });
  }

  formatName(businessName: string) {
    return businessName.split(' ').join('-').toLowerCase();
  }

  onDateSelected($event: Date) {
    // Logic to load available time slots for the selected date and other parameters
    this.bookingService.setSelectedDate($event);
    this.loadAvailableTimeSlots();
  }

  onTimeSelected($event: string) {
    this.bookingService.setSelectedTime($event);
    //route to confirm booking
  }

  private loadAvailableTimeSlots() {
    const serviceId = this.bookingService.getSelectedServices()[0].id;
    const date = this.bookingService.getSelectedDate()!;
    const employeeId = this.bookingService.getSelectedEmployeeId();
    console.log('employee id: ' + employeeId);

    console.log('loading available time slots with parameters: ' + this.business?.id + ' ' + serviceId + ' ' + date + ' ' + employeeId);

    this.appointmentService.getAvailableTimeSlots(this.business?.id!, serviceId, date, employeeId).subscribe(
      (times) => {
        this.availableSlots = times.map(t => t.startTime);
      }
    );
  }

  private loadEmployeesForService(businessId: number, serviceId: number) {
    this.businessService.getEmployeesForService(businessId, serviceId).subscribe(
      employees => {
        this.employeesForService = employees;
      }
    );
  }

  onEmployeeSelected(employee: Employee) {
    this.bookingService.setSelectedEmployeeId(employee.id);
    this.loadAvailableTimeSlots();
  }
}
