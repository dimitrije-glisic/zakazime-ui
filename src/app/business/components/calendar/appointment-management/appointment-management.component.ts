import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {BusinessService} from "../../../services/business-service";
import {Business} from "../../../../interfaces/business";
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";

@Component({
  selector: 'app-appointment-management',
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent implements OnInit {

  allAppointments: AppointmentRichObject[] = [];
  waitingAppointments: AppointmentRichObject[] = [];
  appointmentsForCalendar: AppointmentRichObject[] = [];

  business: Business | undefined;

  constructor(private businessService: BusinessService, private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe((business: any) => {
      this.business = business;
      this.loadAppointments(this.business!.id, new Date());
    });
  }

  private loadAppointments(businessId: number, date: Date) {
    this.appointmentService.getAllAppointments(businessId, date).subscribe((appointments: any) => {
      this.allAppointments = appointments;
      console.log('All appointments:', this.allAppointments);
      this.waitingAppointments = this.allAppointments
        .filter((appointment: AppointmentRichObject) => appointment.appointment.status === 'SCHEDULED')
        .filter((appointment: AppointmentRichObject) => this.fromStringDate(appointment.appointment.startTime) > new Date());
      this.appointmentsForCalendar = this.allAppointments = this.allAppointments.filter((appointment: AppointmentRichObject) =>
        appointment.appointment.status !== 'SCHEDULED' || this.fromStringDate(appointment.appointment.startTime) < new Date());
    });
  }

  private fromStringDate(startTime: string) {
    return new Date(startTime);
  }

  confirmAppointment(a: AppointmentRichObject) {
    this.appointmentService.confirmAppointment(a.appointment).subscribe(() => {
      this.loadAppointments(this.business!.id, new Date());
    });
  }

  cancelAppointment(a: AppointmentRichObject) {
    this.appointmentService.cancelAppointment(a.appointment).subscribe(() => {
      this.loadAppointments(this.business!.id, new Date());
    });
  }

}
