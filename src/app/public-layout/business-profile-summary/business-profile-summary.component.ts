import {Component, Input} from '@angular/core';
import {Business} from "../../interfaces/business";
import {AppointmentRichObject} from "../../interfaces/appointment-rich-object";
import {BusinessService} from "../../business/services/business-service";
import {AppointmentService} from "../booking/services/appointment.service";

@Component({
  selector: 'app-business-profile-summary',
  templateUrl: './business-profile-summary.component.html',
  styleUrls: ['./business-profile-summary.component.css']
})
export class BusinessProfileSummaryComponent {

  @Input() business: Business | undefined;

  appointments: AppointmentRichObject[] | undefined;
  lastAppointment: AppointmentRichObject | undefined;

  lastWorkingHourForToday: string | undefined;
  firstWorkingHourForTomorrow: string | undefined;
  lastWorkingHourForTomorrow: string | undefined;

  constructor(private appointmentService: AppointmentService,
              private businessService: BusinessService) {
  }

  ngOnInit(): void {
    if (!this.business) {
      throw new Error('BusinessProfileSummaryComponent: Business is not loaded');
    }
    this.loadAppointments(this.business.id);
  }

  private loadAppointments(id: number) {
    this.appointmentService.getAllAppointmentsWithReviewsForBusiness(id).subscribe(appointments => {
      this.appointments = appointments;
    });
    this.appointmentService.getLatestAppointmentForBusiness(id).subscribe(appointment => {
      this.lastAppointment = appointment;
    });
    this.loadLastWorkingHourForToday();
    this.loadWorkingHoursForTomorrow();
  }

  // =========== NOT IMPLEMENTED ===========

  getRating() {

    if (!this.appointments || this.appointments.length === 0) {
      return 0;
    }

    return this.appointments?.map(appointment => {
      const serviceRating = appointment.review.service;
      const priceQualityRating = appointment.review.priceQuality;
      const hygieneRating = appointment.review.hygiene;
      const ambienceRating = appointment.review.ambience;
      const sum = serviceRating + priceQualityRating + hygieneRating + ambienceRating;
      return sum / 4;
    }).reduce((acc, rating) => acc + rating, 0) / this.appointments.length;

  }

  getRatingCount() {
    // return Math.floor(Math.random() * 100);
    return this.appointments?.length;
  }

  getLastAppointmentBookTime() {
    if (!this.lastAppointment) {
      return "N/A";
    }

    // "createdAt": "2024-03-27T13:59:28.705875"
    const createdDate = new Date(this.lastAppointment?.appointment!.createdAt!);
    const now = new Date();

    const diff = now.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);

    if (diffInMinutes < 60) {
      return `pre ${diffInMinutes} minuta`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
      return `pre ${diffInHours} sati`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `pre ${diffInDays} dana`;

  }

  loadLastWorkingHourForToday() {
    this.businessService.getWorkingHours(this.business!.id, new Date()).subscribe(workingHours => {
      this.lastWorkingHourForToday = workingHours.startTime;
    });
  }

  loadWorkingHoursForTomorrow() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.businessService.getWorkingHours(this.business!.id, tomorrow).subscribe(workingHours => {
      this.firstWorkingHourForTomorrow = workingHours.startTime;
      this.lastWorkingHourForTomorrow = workingHours.endTime;
    });

  }

  getFirstWorkingHourForTomorrow() {
    if (!this.firstWorkingHourForTomorrow) {
      return "N/A";
    }
    return this.firstWorkingHourForTomorrow;

  }

  getLastWorkingHourForTomorrow() {
    if (!this.lastWorkingHourForTomorrow) {
      return "N/A";
    }
    return this.lastWorkingHourForTomorrow;
  }

  getLastWorkingHourForToday() {
    if (!this.lastWorkingHourForToday) {
      return "N/A";
    }
    return this.lastWorkingHourForToday;
  }
}
