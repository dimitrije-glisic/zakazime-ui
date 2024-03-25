import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {BusinessService} from "../../../services/business-service";
import {Business} from "../../../../interfaces/business";
import {BusinessRichObject} from "../../../../interfaces/business-rich-object";
import {Employee} from "../../../../interfaces/employee";
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";
import {format} from "date-fns";
import {AppointmentInfoModalComponent} from "../appointment-info-modal/appointment-info-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './appointment-calendar.component.css'
})
export class AppointmentCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Week;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  allAppointments: AppointmentRichObject[] = [];
  showingAppointments: AppointmentRichObject[] = [];
  selectedEmployee: Employee | undefined;
  businessData: BusinessRichObject | undefined;

  constructor(private businessService: BusinessService,
              private appointmentService: AppointmentService,
              private matDialog: MatDialog) {
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
      this.businessData = business;
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
      // title = time | customer| service
      const startTime = format(new Date(appointment.appointment.startTime), 'HH:mm');
      const endTime = format(new Date(appointment.appointment.endTime), 'HH:mm');
      const title = startTime + ' - ' + endTime + ', '
        + appointment.customer.firstName + ' ' + appointment.customer.lastName + '<br>'
        + appointment.service.title.slice(0, 50);
      return {
        id: appointment.appointment.id,
        start: new Date(appointment.appointment.startTime),
        end: new Date(appointment.appointment.endTime),
        title: title,
        color: this.getColorForStatus(appointment.appointment.status),
        cssClass: 'appointment-event-title'
      };
    });
  }

  private getColorForStatus(status: string) {
    switch (status) {
      case 'SCHEDULED':
        return {primary: '#1e90ff', secondary: '#D1E8FF'} as EventColor;
      case 'CANCELLED':
        return {primary: '#ad2121', secondary: '#FAE3E3'} as EventColor;
      case 'CONFIRMED': //GREEN
        return {primary: '#008000', secondary: '#32CD32'} as EventColor;
      case 'NO_SHOW':
        return {primary: '#800080', secondary: '#FF00FF'} as EventColor;
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
    this.loadAppointments(this.businessData!.business.id, $event);
  }

  handleEvent(event: CalendarEvent) {
    this.openAppointmentInfoModal(+event.id!);
  }

  openAppointmentInfoModal(appointmentId: number) {
    const appointment = this.allAppointments.find((a) => a.appointment.id === appointmentId);
    const dialogRef = this.matDialog.open(AppointmentInfoModalComponent, {
      data: {appointmentData: appointment},
      width: '60%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const newStatus = result['status'];
      console.log('New status:', newStatus);
      if (newStatus !== appointment?.appointment.status) {
        console.log('Status changed, reloading events');
        this.loadAppointments(this.businessData!.business.id, this.viewDate);
      }
    });

  }

}
