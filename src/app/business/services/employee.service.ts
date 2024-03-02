import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../interfaces/employee";
import {Observable} from "rxjs";
import {EmployeeRichObject} from "../../interfaces/employee-rich-object";
import {MessageResponse} from "../../interfaces/message-response";
import {Service} from "../../interfaces/service";
import {WorkingHours} from "../../interfaces/working-hours";
import {WorkingHoursRequest} from "../../interfaces/working-hours-request";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  rootPath = '/api/business/{businessId}/employees';

  constructor(private http: HttpClient) {
  }

  createEmployee(businessId: number, employee: Employee): Observable<Employee> {
    // return this.http.post(this.path, employee);
    // @ts-ignore
    const path = this.rootPath.replace('{businessId}', businessId.toString());
    console.log('path:', path);
    return this.http.post<Employee>(path, employee);
  }

  getEmployees(businessId: number) {
    console.log('getting employees for business:', businessId);
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/all';
    return this.http.get<Employee[]>(path);
  }

  getEmployeeFull(businessId: number, employeeId: number) {
    console.log('getting employee:', employeeId);
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + employeeId + '/full';
    console.log('path:', path)
    return this.http.get<EmployeeRichObject>(path);
  }

  updateEmployee(businessId: number, employeeId: number, value: Employee) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + employeeId;
    return this.http.put<MessageResponse>(path, value);
  }

  addServicesToEmployee(businessId: number, employeeId: number, selectedServices: Service[]) {
    const serviceIds = selectedServices.map(s => s.id);
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + employeeId + '/services';
    return this.http.post<MessageResponse>(path, serviceIds);
  }

  removeServiceFromEmployee(businessId: number, employeeId: number, id: number) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + employeeId + '/services/' + id;
    return this.http.delete<MessageResponse>(path);
  }

  setWorkingHours(businessId: number, employeeId: number, workingHoursRequest: WorkingHoursRequest) {
    const path = this.rootPath.replace('{businessId}', businessId.toString()) + '/' + employeeId + '/working-hours';
    return this.http.post<MessageResponse>(path, workingHoursRequest);
  }
}
