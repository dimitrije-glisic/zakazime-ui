import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BusinessService} from "../../../services/business-service";
import {Service} from "../../../../interfaces/service";
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {SingleServiceAppointmentRequest} from "../../../../interfaces/single-service-appointment-request";
import {CustomerRichObject} from "../../../../interfaces/customer-rich-object";
import {Customer} from "../../../../interfaces/customer";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrl: './create-appointment-modal.component.css'
})
export class CreateAppointmentModalComponent implements OnInit {
  businessId: number | undefined;
  allServices: Service[] = [];

  protected selectedCustomer: CustomerRichObject | undefined;

  constructor(
    private dialogRef: MatDialogRef<CreateAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessService: BusinessService,
    private appointmentService: AppointmentService,
    private customerService: CustomerService,
  ) {

    this.businessId = data.businessId;
  }

  ngOnInit(): void {
    this.businessService.getServices().subscribe(services => {
      this.allServices = services;
    });
  }

  onCustomerSelected($event: Customer) {
    this.customerService.getCustomerFull(this.businessId!, $event.id).subscribe(customer => {
      this.selectedCustomer = customer;
    });
  }

  create($event: SingleServiceAppointmentRequest) {
    if (this.selectedCustomer) {
      const request = $event;
      request.customerData = {
        firstName: this.selectedCustomer.customerData.firstName,
        lastName: this.selectedCustomer.customerData.lastName,
        email: this.selectedCustomer.customerData.email,
        phone: this.selectedCustomer.customerData.phone
      };

      this.appointmentService.createAppointment(request).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
