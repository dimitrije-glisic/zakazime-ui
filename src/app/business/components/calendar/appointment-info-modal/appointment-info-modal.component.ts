import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentRichObject} from "../../../../interfaces/appointment-rich-object";
import {CustomerService} from "../../../services/customer.service";
import {CustomerRichObject} from "../../../../interfaces/customer-rich-object";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";

@Component({
  selector: 'app-appointment-info-modal',
  templateUrl: './appointment-info-modal.component.html',
  styleUrl: './appointment-info-modal.component.css'
})
export class AppointmentInfoModalComponent implements OnInit {

  appointmentData: AppointmentRichObject | undefined;
  customerFull: CustomerRichObject | undefined;

  constructor(private dialogRef: MatDialogRef<AppointmentInfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: any,
              private customerService: CustomerService,
              private appointmentService: AppointmentService
              ) {
    this.appointmentData = data.appointmentData;
    console.log('Appointment data:', this.appointmentData);
  }

  ngOnInit(): void {
    this.customerService.getCustomerFull(this.appointmentData!.appointment.businessId, this.appointmentData!.appointment.customerId).subscribe(customerFull => {
      this.customerFull = customerFull;
    });
  }

  onStatusChanged(status: string) {
    console.log('Updating status to', status);
    // this.showStatusOptions = false;
    const businessId = this.appointmentData!.appointment.businessId;
    const employeeId = this.appointmentData!.appointment.employeeId;
    const appointmentId = this.appointmentData!.appointment.id;
    this.appointmentService.updateStatus(businessId, employeeId, appointmentId, status.toLowerCase()).subscribe(() => {
      this.appointmentData!.appointment.status = status;
      // this.statusChanged.emit(status);
      this.dialogRef.close({status: status});

    });
  }



}
