import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {EmployeeRichObject} from "../../../../interfaces/employee-rich-object";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessService} from "../../../services/business-service";
import {MatDialog} from '@angular/material/dialog';
import {
  AddServiceForEmployeeModalComponent
} from "../add-service-for-employee-modal/add-service-for-employee-modal.component";
import {WorkingHours} from "../../../../interfaces/working-hours";
import {WorkingHoursRequest} from "../../../../interfaces/working-hours-request";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: EmployeeRichObject | undefined;
  businessId: number | undefined;
  employeeId: number;
  editForm: FormGroup;

  constructor(private employeeService: EmployeeService, private businessService: BusinessService, private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.employeeId = this.activeRoute.snapshot.params['employeeId'];
    this.editForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe(business => {
      this.businessId = business!.id;
      this.employeeService.getEmployeeFull(this.businessId, this.employeeId).subscribe(employee => {
        this.employee = employee;
        this.populateForm();
      });
    });
  }

  private populateForm() {
    // Populate the form with the employee details (name, email, and phone)
    this.editForm.patchValue({
      name: this.employee!.employee.name,
      email: this.employee!.employee.email,
      phone: this.employee!.employee.phone
    });
  }

  onEditSubmit() {
    this.employeeService.updateEmployee(this.businessId!, this.employeeId, this.editForm.value).subscribe((e) => {
      this.employeeService.getEmployeeFull(this.businessId!, this.employeeId).subscribe(employee => {
        this.employee = employee;
        this.populateForm();
      });
    });
  }

  onDeleteService(id: number) {
    this.employeeService.removeServiceFromEmployee(this.businessId!, this.employeeId, id).subscribe(() => {
      this.employeeService.getEmployeeFull(this.businessId!, this.employeeId).subscribe(employee => {
        this.employee = employee;
      });
    });
  }

  openAddModal() {
    const dialogRef = this.dialog.open(AddServiceForEmployeeModalComponent, {
      data: {employeeId: this.employeeId, businessId: this.businessId, services: this.employee!.services}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.employeeService.getEmployeeFull(this.businessId!, this.employeeId).subscribe(employee => {
        this.employee = employee;
      });
    });
  }

  onWorkingHoursChanged($event: WorkingHours[]) {
    const request: WorkingHoursRequest = {
      workingHours: $event
    }
    this.employeeService.setWorkingHours(this.businessId!, this.employeeId, request).subscribe(() => {
      this.employeeService.getEmployeeFull(this.businessId!, this.employeeId).subscribe(employee => {
        this.employee = employee;
      });
    });
  }
}
