import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BusinessService} from "../../../services/business-service";
import {Service} from "../../../../interfaces/service";
import {AppointmentService} from "../../../../public-layout/booking/services/appointment.service";
import {SingleServiceAppointmentRequest} from "../../../../interfaces/single-service-appointment-request";
import {Employee} from "../../../../interfaces/employee";

@Component({
  selector: 'app-create-appointment-modal',
  templateUrl: './create-appointment-modal.component.html',
  styleUrl: './create-appointment-modal.component.css'
})
export class CreateAppointmentModalComponent implements OnInit {
  // form: FormGroup;

  businessId: number | undefined;

  allServices: Service[] = [];
  selectableServices: Service[] = [];
  allEmployees: Employee[] = [];
  selectableEmployees: Employee[] = [];

  selectedDate: Date = new Date();
  selectedService: Service | undefined;
  selectedTime: string | undefined;
  selectedEmployee: Employee | undefined;

  constructor(
    private dialogRef: MatDialogRef<CreateAppointmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessService: BusinessService,
    private appointmentService: AppointmentService) {

    this.businessId = data.businessId;

  }

  ngOnInit(): void {
    this.businessService.getServices().subscribe(services => {
      this.allServices = services;
      this.selectableServices = services;
    });
    this.businessService.getEmployees(this.businessId!).subscribe(employees => {
      this.allEmployees = employees;
      this.selectableEmployees = employees;
    });
  }

  save() {
    const request: SingleServiceAppointmentRequest = {
      businessId: this.businessId!,
      employeeId: this.selectedEmployee!.id,
      serviceId: this.selectedService!.id,
      customerData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      startTime: this.selectedDate.toISOString() + 'T' + this.selectedTime
    };

    this.appointmentService.createAppointment(request).subscribe(() => {
      this.dialogRef.close();
    });

  }

  onDateChange(event: Date) {
    this.selectedDate = event;
  }

  onServiceChange(event: Service) {
    this.selectedService = event;
    this.reloadSelectableEmployees(event.id);
  }

  reloadSelectableEmployees(serviceId: number) {
    this.businessService.getEmployeesForService(this.businessId!, serviceId).subscribe(employees => {
      this.selectableEmployees = employees;
    });
  }

  onEmployeeChange(event: Employee) {
    this.selectedEmployee = event;
    this.reloadSelectableServices(event.id);
  }

  reloadSelectableServices(employeeId: number) {
    this.businessService.getServicesForEmployee(this.businessId!, employeeId).subscribe(services => {
      this.selectableServices = services;
    });
  }

  onTimeChange(event: string) {
    this.selectedTime = event;
  }

  close() {
    this.dialogRef.close();
  }

}
