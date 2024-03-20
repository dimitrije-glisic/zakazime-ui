import {Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {BusinessService} from "../../../services/business-service";
import {Business} from "../../../../interfaces/business";
import {BusinessRichObject} from "../../../../interfaces/business-rich-object";
import {Employee} from "../../../../interfaces/employee";
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";

@Component({
  selector: 'app-appointment-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment-calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './appointment-calendar.component.css'
})
export class AppointmentCalendarComponent implements OnInit, OnChanges {

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  allAppointments: AppointmentRichObject[] = [];
  showingAppointments: AppointmentRichObject[] = [];
  selectedEmployee: Employee | undefined;
  business: BusinessRichObject | undefined;

  constructor(private businessService: BusinessService, private appointmentService: AppointmentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe((business: Business | undefined) => {
      if (business) {
        this.loadData(business.id);
      } else {
        throw new Error('Business not found');
      }
    });
  }

  private loadData(businessId: number) {
    const date = this.viewDate;
    this.businessService.getBusinessRichObjectCached(businessId).subscribe((business: BusinessRichObject | undefined) => {
      this.business = business;
      this.selectedEmployee = business?.employees[0];
      this.loadAppointments(businessId, date);
    });
  }

  private loadAppointments(businessId: number, date: Date) {
    console.log('Loading appointments for business', businessId, 'on date', date);
    this.appointmentService.getAllAppointments(businessId, date).subscribe((appointments: any) => {
      this.allAppointments = appointments;
      this.reloadEvents();
      console.log(this.events);
    });
  }

  private reloadEvents() {
    this.showingAppointments = this.allAppointments.filter((appointment: AppointmentRichObject) => {
      return this.selectedEmployee?.id === appointment.appointment.employeeId;
    });

    this.events = this.showingAppointments.map((appointment: AppointmentRichObject) => {
      return {
        start: new Date(appointment.appointment.startTime),
        end: new Date(appointment.appointment.endTime),
        title: 'Appointment done by ' + appointment.employee.name,
        color: this.getColorForStatus(appointment.appointment.status)
      };
    });
  }

  private getColorForStatus(status: string) {
    switch (status) {
      case 'SCHEDULED':
        return {primary: '#1e90ff', secondary: '#D1E8FF'} as EventColor;
      case 'CONFIRMED':
        return {primary: '#e3bc08', secondary: '#FDF1BA'} as EventColor;
      case 'CANCELLED':
        return {primary: '#ad2121', secondary: '#FAE3E3'} as EventColor;
      case 'COMPLETED': //GREEN
        return {primary: '#008000', secondary: '#32CD32'} as EventColor;
      default:
        return {primary: '#1e90ff', secondary: '#D1E8FF'} as EventColor;
    }

  }

  onEmployeeClick(employee: Employee): void {
    this.selectedEmployee = employee;
    this.reloadEvents();
  }

  onViewDateChange($event: Date) {
    this.viewDate = $event;
    console.log('View date changed', $event);
    this.loadAppointments(this.business!.business.id, $event);
  }
}
