import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {addDays, addHours, startOfDay} from 'date-fns';
import {EventColor} from 'calendar-utils';
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {Appointment} from "../../../../interfaces/appointment";

@Component({
  selector: 'app-appointment-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event',
      color: this.yellowColor
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Another event',
      color: this.blueColor
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 2), 2),
      end: addDays(new Date(), 2),
      title: 'And another',
      color: this.redColor
    },
  ];

  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    const businessId = 1;
    const date = new Date();
    this.appointmentService.getAllAppointments(businessId, date).subscribe((appointments: any) => {
      this.appointments = appointments;
      this.events = this.appointments.map((appointment: Appointment) => {
        return {
          start: new Date(appointment.startTime),
          end: new Date(appointment.endTime),
          title: 'Appointment done by ' + appointment.employeeId,
          color: appointment.employeeId % 2 === 0 ? this.yellowColor : this.blueColor
        };
      });
    });
  }

}

