import {Service} from "./service";
import {Employee} from "./employee";
import {WorkingHours} from "./working-hours";

export interface EmployeeRichObject {
  employee: Employee;
  services: Service[];
  workingHours: WorkingHours[];
}

