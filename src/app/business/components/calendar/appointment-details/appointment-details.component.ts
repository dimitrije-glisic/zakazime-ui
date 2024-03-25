import {Component, Input} from '@angular/core';
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {

  @Input() appointmentData: AppointmentRichObject | undefined;

}
