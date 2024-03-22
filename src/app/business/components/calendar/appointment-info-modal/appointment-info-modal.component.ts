import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";
import {CustomerService} from "../../../services/customer.service";
import {CustomerRichObject} from "../../../../interfaces/customer-rich-object";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";


interface StatusOption {
  next?: string[]; // 'next' is optional
}

@Component({
  selector: 'app-appointment-info-modal',
  templateUrl: './appointment-info-modal.component.html',
  styleUrl: './appointment-info-modal.component.css'
})
export class AppointmentInfoModalComponent implements OnInit {

  appointmentData: AppointmentRichObject | undefined;
  customerFull: CustomerRichObject | undefined;

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

  constructor(private dialogRef: MatDialogRef<AppointmentInfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private customerService: CustomerService,
              private appointmentService: AppointmentService) {
    this.appointmentData = data.appointmentData;
    console.log('Appointment data:', this.appointmentData);
  }

  ngOnInit(): void {
    this.customerService.getCustomerFull(this.appointmentData!.appointment.businessId, this.appointmentData!.appointment.customerId).subscribe(customerFull => {
      this.customerFull = customerFull;
    });
  }

  toggleStatusOptions() {
    this.showStatusOptions = !this.showStatusOptions;
  }

  getStatusColorClass(status: string): string {
    return 'status-' + status;
  }

  getStatusNextOptions(status: string): string[] {
    if (status in this.statusOptions) {
      const statusProperties = this.statusOptions[status as keyof typeof this.statusOptions];
      return statusProperties.next || []; // Return the 'next' array if it exists, otherwise return an empty array
    }
    return []; // Return an empty array if the status is not found
  }

  isChangeable(status: string) {
    const next = this.getStatusNextOptions(this.appointmentData!.appointment.status.toLowerCase())
    return next.length > 0
  }

  updateStatus(status: string) {
    console.log('Updating status to', status);
    this.showStatusOptions = false;
    const businessId = this.appointmentData!.appointment.businessId;
    const employeeId = this.appointmentData!.appointment.employeeId;
    const appointmentId = this.appointmentData!.appointment.id;
    this.appointmentService.updateStatus(businessId, employeeId, appointmentId, status.toLowerCase()).subscribe(() => {
      this.appointmentData!.appointment.status = status;
    });

    // pass information to the parent component that status has been updated
    this.dialogRef.close({status: status.toUpperCase()});
  }

}
