import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EmployeeRichObject} from "../../../../interfaces/employee-rich-object";
import {WorkingHours} from "../../../../interfaces/working-hours";

@Component({
  selector: 'app-employee-working-hours',
  templateUrl: './employee-working-hours.component.html',
  styleUrl: './employee-working-hours.component.css'
})
export class EmployeeWorkingHoursComponent {

  _employee: EmployeeRichObject | undefined;
  @Input() set employee(employee: EmployeeRichObject | undefined) {
    this._employee = employee;
    console.log('Employee:', employee);
  }
  @Output() workingHoursChanged: EventEmitter<WorkingHours[]> = new EventEmitter<WorkingHours[]>();

  getDayName(dayOfWeek: number) {
    switch (dayOfWeek) {
      case 1:
        return 'Ponedeljak';
      case 2:
        return 'Utorak';
      case 3:
        return 'Sreda';
      case 4:
        return 'Četvrtak';
      case 5:
        return 'Petak';
      case 6:
        return 'Subota';
      case 7:
        return 'Nedelja';
      default:
        return '';
    }
  }

  saveWorkingHours() {
    this.workingHoursChanged.emit(this._employee!.workingHours);
  }
}
