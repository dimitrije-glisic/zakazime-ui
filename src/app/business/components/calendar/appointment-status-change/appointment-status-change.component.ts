import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Input() userRole: string | undefined = 'USER';
  @Input() appointment: Appointment | undefined;
  @Output() statusChanged: EventEmitter<string> = new EventEmitter<string>();

  statusOptions = (): { [key: string]: StatusOption } => {
    if (this.userRole === 'SERVICE_PROVIDER') {
      return {
        scheduled: {next: ['confirmed', 'cancelled', 'no_show']},
        confirmed: {next: ['cancelled', 'no_show', 'completed']},
        completed: {next: []},
        cancelled: {next: []},
        no_show: {next: []},
      };
    }
    return {
      scheduled: {next: ['cancelled']},
      confirmed: {next: ['cancelled']},
      completed: {next: []},
      cancelled: {next: []},
      no_show: {next: []},
    };
  }

  statusLabels: { [key: string]: string } = {
    scheduled: 'Zakazano',
    confirmed: 'Potvrđeno',
    completed: 'Završeno',
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
    if (status in this.statusOptions()) {
      const statusProperties = this.statusOptions()[status as keyof typeof this.statusOptions];
      return statusProperties.next || []; // Return the 'next' array if it exists, otherwise return an empty array
    }
    return []; // Return an empty array if the status is not found
  }

  updateStatus(status: string) {
    this.statusChanged.emit(status);
  }
}
