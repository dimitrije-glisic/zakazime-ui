import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../../interfaces/employee";
import {BusinessService} from "../../../services/business-service";
import {Business} from "../../../../interfaces/business";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css'
})
export class EmployeeManagementComponent implements OnInit {
  addForm: FormGroup;

  business: Business | undefined;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private businessService: BusinessService, private formBuilder: FormBuilder,
              private router: Router) {
    this.addForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit() {
    this.businessService.getBusinessCached().subscribe(business => {
      this.business = business;
      this.employeeService.getEmployees(business!.id).subscribe(employees => {
        this.employees = employees;
      });
    });
  }

  onAddSubmit() {
    const businessId = this.business!.id;
    this.employeeService.createEmployee(businessId, this.addForm.value as Employee).subscribe((e) => {
      console.log('Employee created:', e);
      this.employeeService.getEmployees(businessId).subscribe(employees => {
        console.log('Employees:', employees);
        this.employees = employees;
      });
    });
  }

  onEmployeeClick(employee: Employee) {
    console.log('Employee clicked:', employee);
  }

  detailsEmployee(employee: Employee) {
    this.router.navigate(['manage-business/employees', employee.id]);
  }
}
