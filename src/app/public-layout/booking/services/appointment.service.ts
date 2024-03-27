import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SingleServiceAppointmentRequest} from "../../../interfaces/single-service-appointment-request";
import {MultiServiceAppointmentRequest} from "../../../interfaces/multi-service-appointment-request";
import {formatDate} from "@angular/common";
import {AppointmentRichObject} from "../../../interfaces/appointment-rich-object";
import {Appointment} from "../../../interfaces/appointment";
import {AppointmentRequestContext} from "../../../interfaces/appointment-request-context";
import {ReviewRequest} from "../../../interfaces/review-request";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public basePath = '/api/appointments';

  constructor(private http: HttpClient) {
  }

  public createAppointment(appointment: SingleServiceAppointmentRequest) {
    return this.http.post(`${this.basePath}`, appointment);
  }

  public createMultiServiceAppointment(appointment: MultiServiceAppointmentRequest) {
    return this.http.post(`${this.basePath}/multi`, appointment);
  }

  public getAllAppointmentsForBusiness(businessId: number, date: Date) {
    const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');
    console.log('Getting all appointments for business', businessId, 'on date', dateStr);
    return this.http.get<AppointmentRichObject>(`${this.basePath}/${businessId}/all-full-info?fromDate=${dateStr}`);
  }

  public getLatestAppointmentForBusiness(businessId: number) {
    return this.http.get<AppointmentRichObject>(`${this.basePath}/${businessId}/last-created`);
  }

  public getAllAppointmentsWithReviewsForBusiness(businessId: number) {
    return this.http.get<AppointmentRichObject[]>(`${this.basePath}/${businessId}/with-reviews`);
  }

  public confirmAppointment(appointment: Appointment) {
    const appointmentRequestContext = {
      businessId: appointment.businessId,
      employeeId: appointment.employeeId,
      appointmentId: appointment.id
    }
    console.log('confirming appointment', appointmentRequestContext);
    return this.http.post(`${this.basePath}/confirm`, appointmentRequestContext);
  }

  cancelAppointment(appointment: Appointment) {
    const appointmentRequestContext = {
      businessId: appointment.businessId,
      employeeId: appointment.employeeId,
      appointmentId: appointment.id
    }
    return this.http.post(`${this.basePath}/cancel`, appointmentRequestContext);
  }

  getAppointmentsOfBusinessForCustomer(businessId: number, customerId: number) {
    return this.http.get<AppointmentRichObject[]>(`${this.basePath}/${businessId}/customer/${customerId}`);
  }

  getAppointmentsForUser(userId: number) {
    return this.http.get<AppointmentRichObject[]>(`${this.basePath}/for-user/${userId}`);
  }

  updateStatus(businessId: number, employeeId: number, appointmentId: number, status: string) {
    const request: AppointmentRequestContext = {
      businessId: businessId,
      employeeId: employeeId,
      appointmentId: appointmentId
    }
    let action = '';
    switch (status) {
      case 'confirmed':
        action = 'confirm';
        break;
      case 'cancelled':
        action = 'cancel';
        break;
      case 'noshow':
        action = 'no-show';
        break;
      case 'completed':
        action = 'complete';
        break;
      default:
        throw new Error('Invalid status');
    }
    const url = `${this.basePath}/${action}`;

    return this.http.post(url, request);
  }

  addReview(request: ReviewRequest) {
    console.log('Adding review', request);
    return this.http.post(`${this.basePath}/reviews`, request);
  }

  updateReview(request: ReviewRequest) {
    console.log('Updating review', request);
    return this.http.put(`${this.basePath}/reviews`, request);
  }

  deleteReview(appointmentId: number) {
    console.log('Deleting review for appointment', appointmentId);
    return this.http.delete(`${this.basePath}/reviews/${appointmentId}`);
  }

}
