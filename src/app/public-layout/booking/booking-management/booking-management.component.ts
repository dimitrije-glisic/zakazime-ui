import {Component, OnInit} from '@angular/core';
import {BookingService} from "../services/booking.service";
import {TimeslotService} from "../services/timeslot.service";
import {ActivatedRoute, Router} from "@angular/router";
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
              private appointmentService: TimeslotService,
              private activatedRoute: ActivatedRoute,
              private businessService: BusinessService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-name': businessName} = params;
      this.businessService.getBusinessesInCity(city).subscribe(
        businesses => {
          const business = businesses.find(b => this.formatName(b.name) === businessName);
          this.bookingService.setBusiness(business!);
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
    this.router.navigate(['../confirmation'], {relativeTo: this.activatedRoute});
  }

  private loadAvailableTimeSlots() {
    const serviceId = this.bookingService.getSelectedServices()[0].id;
    const date = this.bookingService.getSelectedDate()!;
    const employeeId = this.bookingService.getSelectedEmployee()?.id;

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
    this.bookingService.setSelectedEmployee(employee);
    this.loadAvailableTimeSlots();
  }
}
