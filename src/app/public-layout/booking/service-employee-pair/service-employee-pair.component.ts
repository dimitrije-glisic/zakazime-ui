import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service} from "../../../interfaces/service";
import {Employee} from "../../../interfaces/employee";
import {MatSelectChange} from "@angular/material/select";
import {Business} from "../../../interfaces/business";
import {Location} from "@angular/common";

@Component({
  selector: 'app-service-employee-pair',
  templateUrl: './service-employee-pair.component.html',
  styleUrl: './service-employee-pair.component.css'
})
export class ServiceEmployeePairComponent {

  _service: Service | undefined;
  @Input() set service(service: Service | undefined) {
    this._service = service;
  }

  @Input() employees: Employee[] | undefined;

  //maybe a separate component for this
  @Input() business: Business | undefined;

  selectedEmployee: Employee | undefined;
  @Output() employeeSelected = new EventEmitter<Employee>();

  @Input() selectedServicePossibleEmployeesMap: Map<Service, Employee[]> | undefined;
  @Output() serviceEmployeePairSelected = new EventEmitter<{ employee: Employee, service: Service }>();

  constructor(private location: Location) {
  }

  onServiceEmployeePairSelected(service: Service, employee: Employee) {
    this.serviceEmployeePairSelected.emit({employee, service});
  }

  //to be removed
  onEmployeeSelected($event: MatSelectChange) {
    this.employeeSelected.emit($event.value);
  }

  goBack() {
    this.location.back();
  }

  totalPrice() {
    if (this.selectedServicePossibleEmployeesMap) {
      let total = 0;
      this.selectedServicePossibleEmployeesMap.forEach((employees, service) => {
        const price = service.price;
        total += price;
      });
      return total;
    } else if (this._service) {
      return this._service.price;
    }
    return 0;
  }

}
