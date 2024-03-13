import {Component, OnInit} from '@angular/core';
import {BookingService} from "../services/booking.service";
import {TimeslotService} from "../services/timeslot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BusinessService} from "../../../business/services/business-service";
import {Service} from "../../../interfaces/service";
import {Employee} from "../../../interfaces/employee";
import {Business} from "../../../interfaces/business";
import {EmployeeServiceIdPair} from "../../../interfaces/multi-service-appointment-request";
import {MultiServiceEmployeeAvailabilityRequest} from "../../../interfaces/multi-service-employee-availability-request";

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
  selectedServicePossibleEmployeesMap: Map<Service, Employee[]> | undefined;
  selectedServices: Service[] | undefined;

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
          this.setSelectedServicesEmployeeStartMap()
          this.business = business;
          this.loadAvailableTimeSlots();
          this.selectedService = this.bookingService.getSelectedServices()[0];
          this.selectedServices = this.bookingService.getSelectedServices();
          this.loadEmployeesForService(this.business?.id!, this.bookingService.getSelectedServices()[0].id);
          this.loadEmployeesForServices(this.business?.id!, this.bookingService.getSelectedServices()
            .map(s => s.id));
        }
      );
    });
  }

  private setSelectedServicesEmployeeStartMap() {
    const selectedServices = this.bookingService.getSelectedServices();
    const service2EmployeeMap = new Map<number, Employee | undefined>();
    selectedServices.forEach(service => {
      service2EmployeeMap.set(service.id, undefined);
    });
    this.bookingService.setSelectedService2EmployeeMap(service2EmployeeMap);
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
    const selectedServices = this.bookingService.getSelectedServices();
    if (selectedServices.length > 0 && selectedServices.length === 1) {
      this.loadAvailableTimeSlotsSingleService();
    } else if (selectedServices.length > 0) {
      this.loadAvailableTimeSlotsMultiService();
    }
  }

  private loadAvailableTimeSlotsSingleService() {
    const serviceId = this.bookingService.getSelectedServices()[0].id;
    const date = this.bookingService.getSelectedDate()!;
    const employeeId = this.bookingService.getSelectedEmployee()?.id;

    this.appointmentService.getAvailableTimeSlotsSingleService(this.business?.id!, serviceId, date, employeeId).subscribe(
      (times) => {
        this.availableSlots = times.map(t => t.startTime);
      }
    );
  }

  private loadAvailableTimeSlotsMultiService() {
    const employeeServicePairs = this.bookingService.getSelectedService2EmployeeMap();
    const employeeServiceIdPairs: EmployeeServiceIdPair[] = [];
    employeeServicePairs.forEach((employee, serviceId) => {
      const employeeId = employee?.id || undefined;
      employeeServiceIdPairs.push({employeeId: employeeId, serviceId: serviceId});
    });
    //revert employeeServicePairs order
    const date = this.bookingService.getSelectedDate()!;
    const request: MultiServiceEmployeeAvailabilityRequest = {
      businessId: this.business!.id,
      employeeServicePairs: employeeServiceIdPairs,
      date: date
    }

    this.appointmentService.getAvailableTimeSlotsMultiService(request).subscribe(
      (times) => {
        this.availableSlots = times.map(t => t.startTime);
      }
    );

  }

  private loadEmployeesForServices(businessId: number, serviceIds: number[]) {
    const selectedServicePossibleEmployeesMap = new Map<Service, Employee[]>();
    serviceIds.forEach(serviceId => {
      this.businessService.getEmployeesForService(businessId, serviceId).subscribe(
        employees => {
          selectedServicePossibleEmployeesMap.set(this.selectedServices!.find(s => s.id === serviceId)!, employees);
        }
      );
    });
    this.selectedServicePossibleEmployeesMap = selectedServicePossibleEmployeesMap;
  }

  private loadEmployeesForService(businessId: number, serviceId: number) {
    this.businessService.getEmployeesForService(businessId, serviceId).subscribe(
      employees => {
        this.employeesForService = employees;
      }
    );
  }

  // to be deprecated/removed

  onEmployeeSelected(employee: Employee) {
    this.bookingService.setSelectedEmployee(employee);
    this.loadAvailableTimeSlots();
  }

  onServiceEmployeePairSelected(event: { service: Service, employee: Employee }) {
    let selectedServiceEmployeePair = this.bookingService.getSelectedService2EmployeeMap();
    if (!selectedServiceEmployeePair || selectedServiceEmployeePair.size === 0) {
      selectedServiceEmployeePair = new Map<number, Employee>();
    }
    selectedServiceEmployeePair.set(event.service.id, event.employee);
    this.bookingService.setSelectedService2EmployeeMap(selectedServiceEmployeePair);
    this.loadAvailableTimeSlots();
  }
}
