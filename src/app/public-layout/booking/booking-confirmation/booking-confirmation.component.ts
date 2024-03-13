import {Component, OnInit} from '@angular/core';
import {BookingService} from "../services/booking.service";
import {AuthService} from "../../../auth.service";
import {Service} from "../../../interfaces/service";
import {Account} from "../../../interfaces/account";
import {Business} from "../../../interfaces/business";
import {Location} from "@angular/common";
import {AppointmentService} from "../services/appointment.service";
import {CustomerData} from "../../../interfaces/customer-data";
import {SingleServiceAppointmentRequest} from "../../../interfaces/single-service-appointment-request";
import {ActivatedRoute, Router} from "@angular/router";
import {format} from 'date-fns';
import {
  EmployeeServiceIdPair,
  MultiServiceAppointmentRequest
} from "../../../interfaces/multi-service-appointment-request";


@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent implements OnInit {

  business: Business | undefined;
  selectedService: Service | undefined;
  selectedEmployeeName: string | undefined;
  selectedService2EmployeeNameMap: Map<number, string | undefined> | undefined;
  selectedDate: Date | undefined;
  selectedTime: string | undefined;

  user: Account | undefined;
  showLoginForm: boolean = false;
  email: string | undefined;
  password: string | undefined;

  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  emailInput: string | undefined;
  passwordInput: string | undefined;
  showSuccessAlert: any;

  constructor(private bookingService: BookingService, private authService: AuthService,
              private location: Location, private appointmentService: AppointmentService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.business = this.bookingService.getBusiness();
    this.selectedService = this.bookingService.getSelectedServices()[0];
    this.selectedEmployeeName = this.bookingService.getSelectedEmployee() ?
      this.bookingService.getSelectedEmployee()?.name : 'Prvi slobodan zaposleni';


    const selectedServiceEmployeePair = this.bookingService.getSelectedService2EmployeeMap();
    console.log('selectedServiceEmployeePair: ' + JSON.stringify(selectedServiceEmployeePair));
    this.selectedService2EmployeeNameMap = new Map<number, string | undefined>();
    selectedServiceEmployeePair.forEach((employee, service) => {
      const employeeName = employee ? employee.name : 'Prvi slobodan zaposleni';
      this.selectedService2EmployeeNameMap!.set(service, employeeName);
    });

    this.selectedDate = this.bookingService.getSelectedDate();
    this.selectedTime = this.bookingService.getSelectedTime()
    this.loadUser();
  }

  private loadUser() {
    this.authService.fetchUser().subscribe(user => {
      this.user = user;
      if (user) {
        this.fillInForm(user);
      }
    });
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  login() {
    this.authService.login({email: this.email, password: this.password}).subscribe(user => {
      this.user = user;
      this.fillInForm(user);
      this.showLoginForm = false;
    });
  }

  private fillInForm(user: Account) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phoneNumber = user.phone;
    this.emailInput = user.email;
  }

  goBack() {
    this.location.back();
  }

  confirmBooking() {
    const customerData: CustomerData = {
      firstName: this.firstName!,
      lastName: this.lastName!,
      email: this.emailInput!,
      phone: this.phoneNumber!,
      password: this.passwordInput
    }

    const selectedDate = new Date(this.selectedDate!.toISOString().split('T')[0] + 'T' + this.selectedTime);
    const formattedStartTime = format(selectedDate, 'dd-MM-yyyy HH:mm');

    if (this.bookingService.getSelectedServices().length === 1) {
      this.confirmBookingSingle(customerData, formattedStartTime);
    } else {
      this.confirmBookingMulti(customerData, formattedStartTime);
    }
  }

  confirmBookingSingle(customerData: CustomerData, formattedStartTime: string) {
    const request: SingleServiceAppointmentRequest = {
      businessId: this.business!.id,
      employeeId: this.bookingService.getSelectedEmployee()!.id,
      serviceId: this.selectedService!.id,
      customerData: customerData,
      startTime: formattedStartTime
    }

    console.log('confirmBookingSingle Request: ' + JSON.stringify(request));

    this.appointmentService
      .createAppointment(request)
      .subscribe(() => {
        console.log('Appointment created');
        this.showSuccessAlert = true;
        this.bookingService.reset();
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        }, 2000);
      });
  }

  confirmBookingMulti(customerData: CustomerData, formattedStartTime: string) {
    let empServicePairs: EmployeeServiceIdPair[] = [];
    this.bookingService.getSelectedService2EmployeeMap().forEach((employee, serviceId) => {
      const employeeId = employee ? employee.id : undefined;
      empServicePairs.push({employeeId: employeeId, serviceId: serviceId});
    });

    const request: MultiServiceAppointmentRequest = {
      businessId: this.business!.id,
      employeeServicePairs: empServicePairs,
      customerData: customerData,
      startTime: formattedStartTime
    }

    console.log('MultiServiceAppointmentRequest: ' + JSON.stringify(request));

    this.appointmentService
      .createMultiServiceAppointment(request)
      .subscribe(() => {
        this.bookingService.reset();
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        }, 2000);
      });
  }

  getService(serviceId: number) {
    return this.bookingService.getSelectedServices().find(s => s.id === serviceId);
  }

  totalAmount() {
    return this.bookingService.getSelectedServices().reduce((acc, s) => acc + s.price, 0);
  }
}
