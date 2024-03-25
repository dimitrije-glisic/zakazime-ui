import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";
import {Appointment} from "../../../../interfaces/appointment";

interface StatusOption {
  next?: string[]; // 'next' is optional
}


@Component({
  selector: 'app-appointment-status-change',
  templateUrl: './appointment-status-change.component.html',
  styleUrl: './appointment-status-change.component.css'
})
export class AppointmentStatusChangeComponent {

  @Input() appointment: Appointment | undefined;
  @Output() statusChanged: EventEmitter<string> = new EventEmitter<string>();

  statusOptions: { [key: string]: StatusOption } = {
    scheduled: {next: ['confirmed', 'cancelled', 'no_show']},
    confirmed: {next: ['cancelled', 'no_show']},
    cancelled: {next: []},
    no_show: {next: []},
  };

  statusLabels: { [key: string]: string } = {
    scheduled: 'Zakazano',
    confirmed: 'Potvrđeno',
    cancelled: 'Otkazano',
    no_show: 'Nepojavljivanje',
  }

  showStatusOptions: boolean = false;

  toggleStatusOptions() {
    this.showStatusOptions = !this.showStatusOptions;
  }

  getStatusColorClass(status: string): string {
    return 'status-' + status;
  }

  isChangeable() {
    const next = this.getStatusNextOptions(this.appointment!.status.toLowerCase())
    return next.length > 0
  }

  getStatusNextOptions(status: string): string[] {
    if (status in this.statusOptions) {
      const statusProperties = this.statusOptions[status as keyof typeof this.statusOptions];
      return statusProperties.next || []; // Return the 'next' array if it exists, otherwise return an empty array
    }
    return []; // Return an empty array if the status is not found
  }

  updateStatus(status: string) {
    this.statusChanged.emit(status);
  }
}
