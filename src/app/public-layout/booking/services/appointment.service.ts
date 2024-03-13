import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SingleServiceAppointmentRequest} from "../../../interfaces/single-service-appointment-request";
import {MultiServiceAppointmentRequest} from "../../../interfaces/multi-service-appointment-request";

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

}
