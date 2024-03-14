import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {Appointment} from "../../../../interfaces/appointment";
import {BusinessService} from "../../../services/business-service";
import {Business} from "../../../../interfaces/business";
import {BusinessRichObject} from "../../../../interfaces/business-rich-object";
import {Employee} from "../../../../interfaces/employee";

@Component({
  selector: 'app-appointment-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment-calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './appointment-calendar.component.css'
})
export class AppointmentCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  yellowColor: EventColor = {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  };

  blueColor: EventColor = {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  };

  redColor: EventColor = {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  };

  events: CalendarEvent[] = [];
  allAppointments: Appointment[] = [];
  showingAppointments: Appointment[] = [];
  selectedEmployee: Employee | undefined;
  business: BusinessRichObject | undefined;

  constructor(private businessService: BusinessService, private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.businessService.getBusinessCached().subscribe((business: Business | undefined) => {
      if (business) {
        this.loadData(business.id);
      } else {
        throw new Error('Business not found');
      }
    });
  }

  private loadData(businessId: number) {
    const date = new Date();
    this.businessService.getBusinessRichObjectCached(businessId).subscribe((business: BusinessRichObject | undefined) => {
      this.business = business;
      this.selectedEmployee = business?.employees[0];
      this.loadAppointments(businessId, date);
    });
  }

  private loadAppointments(businessId: number, date: Date) {
    this.appointmentService.getAllAppointments(businessId, date).subscribe((appointments: any) => {
      this.allAppointments = appointments;
      this.reloadEvents();
      console.log(this.events);
    });
  }

  private reloadEvents() {
    this.showingAppointments = this.allAppointments.filter((appointment: Appointment) => {
      return this.selectedEmployee?.id === appointment.employeeId;
    });

    this.events = this.showingAppointments.map((appointment: Appointment) => {
      return {
        start: new Date(appointment.startTime),
        end: new Date(appointment.endTime),
        title: 'Appointment done by ' + appointment.employeeId,
        color: appointment.employeeId % 2 === 0 ? this.yellowColor : this.blueColor
      };
    });
  }

  onEmployeeClick(employee: Employee): void {
    this.selectedEmployee = employee;
    this.reloadEvents();
  }

}
