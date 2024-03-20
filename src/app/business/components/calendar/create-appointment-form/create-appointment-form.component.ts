import {Component, EventEmitter, Input, Output} from '@angular/core';
import {format} from "date-fns";
import {SingleServiceAppointmentRequest} from "../../../../interfaces/single-service-appointment-request";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../../../interfaces/service";
import {Employee} from "../../../../interfaces/employee";
import {BusinessService} from "../../../services/business-service";

@Component({
  selector: 'app-create-appointment-form',
  templateUrl: './create-appointment-form.component.html',
  styleUrl: './create-appointment-form.component.css'
})
export class CreateAppointmentFormComponent {

  appointmentForm: FormGroup;

  _businessId: number | undefined;
  @Input() set businessId(id: number | undefined) {
    this._businessId = id;
  }

  _allServices: Service[] | undefined;
  @Input() set allServices(services: Service[] | undefined) {
    this._allServices = services;
    this.selectableServices = services;
  }

  selectableServices: Service[] | undefined;
  selectableEmployees: Employee[] | undefined;

  selectedService: Service | undefined;

  @Output() appointmentDataOutput: EventEmitter<SingleServiceAppointmentRequest> = new EventEmitter<SingleServiceAppointmentRequest>();

  constructor(
    private businessService: BusinessService,
  ) {

    this.appointmentForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      price: new FormControl({value: '', disabled: true}), // if the price is not editable
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl({value: '', disabled: true}), // end time can be calculated
      employee: new FormControl(null, Validators.required)
    });
  }

  onServiceChange() {
    const serviceId = this.appointmentForm.get('service')?.value.id;
    this.selectedService = this._allServices?.find(s => s.id === serviceId);
    console.log('Service id:', serviceId);
    this.reloadSelectableEmployees(serviceId);
    this.setPrice();
    this.setEndTime();
  }


  setPrice() {
    this.appointmentForm.patchValue({
      price: this.selectedService?.price
    });
  }

  reloadSelectableEmployees(serviceId: number) {
    this.businessService.getEmployeesForService(this._businessId!, serviceId)
      .subscribe(employees => {
        this.selectableEmployees = employees;
        this.appointmentForm.patchValue({
          employee: employees[0]
        });
      });
  }

  onEmployeeChange() {
    const employeeId = this.appointmentForm.get('employee')?.value.id;
    this.reloadSelectableServices(+employeeId);
  }

  reloadSelectableServices(employeeId: number) {
    this.businessService.getServicesForEmployee(this._businessId!, employeeId).subscribe(services => {
      this.selectableServices = services;
    });
  }

  onStartTimeChange() {
    const startTime = this.appointmentForm.get('startTime')?.value;
    console.log('Start time:', startTime);
    this.setEndTime();
  }

  setEndTime() {
    const service = this.appointmentForm.get('service')?.value;
    const date = this.appointmentForm.get('date')?.value;
    const startTime = this.appointmentForm.get('startTime')?.value;

    if (service && date && startTime) {
      const serviceDuration = service.avgDuration;
      console.log('Service duration:', serviceDuration);
      // Assuming date is in 'YYYY-MM-DD' format if it's coming from a date input
      const startTimeDate = new Date(`${date}T${startTime}`);
      const endTime = new Date(startTimeDate.getTime() + serviceDuration * 60000);

      // Ensure that you have imported the format function correctly
      // and that the endTime is a valid date object.
      if (!isNaN(endTime.getTime())) {
        this.appointmentForm.patchValue({
          endTime: format(endTime, 'HH:mm')
        });
      } else {
        // Handle invalid date object here
        console.error('Invalid end time calculated');
      }
    }
  }

  save() {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;
      const date = formValue.date;
      const startTime = formValue.startTime;
      const startTimeDate = new Date(`${date}T${startTime}`);
      const request: SingleServiceAppointmentRequest = {
        businessId: this._businessId!,
        employeeId: formValue.employee.id,
        serviceId: formValue.service.id,
        customerData: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        startTime: format(startTimeDate, 'dd-MM-yyyy HH:mm'),
      };

      this.appointmentDataOutput.emit(request);
    }
  }

}
