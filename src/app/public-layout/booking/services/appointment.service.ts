import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SingleServiceAppointmentRequest} from "../../../interfaces/single-service-appointment-request";
import {MultiServiceAppointmentRequest} from "../../../interfaces/multi-service-appointment-request";
import {formatDate} from "@angular/common";
import {AppointmentRichObject} from "../../../interfaces/appointment-rich-object";
import {Appointment} from "../../../interfaces/appointment";
import {Observable} from "rxjs";
import {AppointmentRequestContext} from "../../../interfaces/appointment-request-context";

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

  public getAppointmentsForEmployee(businessId: number, employeeId: number, date: Date) {
    const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get(`${this.basePath}/${businessId}/${employeeId}?date=${dateStr}`);
  }

  public getAllAppointments(businessId: number, date: Date) {
    const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');
    console.log('Getting all appointments for business', businessId, 'on date', dateStr);
    return this.http.get<AppointmentRichObject>(`${this.basePath}/${businessId}/all-full-info?fromDate=${dateStr}`);
  }

  confirmAppointment(appointment: Appointment) {
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
      default:
        throw new Error('Invalid status');
    }
    const url = `${this.basePath}/${action}`;

    return this.http.post(url, request);
  }

}
