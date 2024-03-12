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
import {MatSnackBar} from "@angular/material/snack-bar";
import {format} from 'date-fns';


@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent implements OnInit {

  business: Business | undefined;
  selectedService: Service | undefined;
  selectedEmployeeName: string | undefined;
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
              private snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.business = this.bookingService.getBusiness();
    this.selectedService = this.bookingService.getSelectedServices()[0];
    this.selectedEmployeeName = this.bookingService.getSelectedEmployee() ?
      this.bookingService.getSelectedEmployee()?.name : 'Prvi slobodan zaposleni';
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
    const request: SingleServiceAppointmentRequest = {
      businessId: this.business!.id,
      employeeId: this.bookingService.getSelectedEmployee()!.id,
      serviceId: this.selectedService!.id,
      customerData: customerData,
      startTime: formattedStartTime
    }

    this.appointmentService
      .createAppointment(request)
      .subscribe(() => {
        console.log('Appointment created');
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.bookingService.reset();
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        }, 2000);
      });
  }

  // showPanel() {
  //   this.showSuccessAlert = true;
  //   setTimeout(() => {
  //     this.showSuccessAlert = false;
  //     this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  //   }, 2000); // Hide the alert after 3 seconds
  // }
}
