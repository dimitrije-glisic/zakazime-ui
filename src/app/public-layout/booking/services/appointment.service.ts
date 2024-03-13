import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SingleServiceAppointmentRequest} from "../../../interfaces/single-service-appointment-request";
import {MultiServiceAppointmentRequest} from "../../../interfaces/multi-service-appointment-request";
import {formatDate} from "@angular/common";

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
    return this.http.get(`${this.basePath}/${businessId}/all?date=${dateStr}`);
  }

}
