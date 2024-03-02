import {Component, Inject, OnInit, TrackByFunction} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {BusinessService} from "../../../services/business-service";
import {Service} from "../../../../interfaces/service";
import {EmployeeService} from "../../../services/employee.service";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-service-for-employee-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCheckbox,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-service-for-employee-modal.component.html',
  styleUrl: './add-service-for-employee-modal.component.css'
})
export class AddServiceForEmployeeModalComponent implements OnInit {
  existingServices: Service[] = [];
  potentialServices: Service[] = [];
  selectedServices: Service[] = [];

  employeeId: number;
  businessId: number;

  constructor(
    private dialogRef: MatDialogRef<AddServiceForEmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessService: BusinessService,
    private employeeService: EmployeeService) {

    this.employeeId = data.employeeId;
    this.businessId = data.businessId;
    this.existingServices = data.services;
  }

  ngOnInit(): void {
    this.businessService.getServices().subscribe(services => {
      this.potentialServices = services.filter(s => !this.existingServices.some(es => es.id === s.id));
    });
  }

  toggleService(service: Service) {
    if (this.selectedServices.includes(service)) {
      this.removeService(service);
    } else {
      this.addService(service);
    }
  }

  addService(service: Service) {
    this.selectedServices.push(service);
  }

  removeService(service: Service) {
    this.selectedServices = this.selectedServices.filter(selectedService => selectedService.id !== service.id);
  }

  saveAll() {
    this.employeeService.addServicesToEmployee(this.businessId, this.employeeId, this.selectedServices).subscribe(() => {
      this.dialogRef.close();
      this.selectedServices = [];
    });
  }

  trackByService(index: number, service: Service) {
    return service.id;
  }

}
