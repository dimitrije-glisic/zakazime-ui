import {Appointment} from "./appointment";
import {Employee} from "./employee";
import {Service} from "./service";
import {CustomerData} from "./customer-data";

export interface AppointmentRichObject {
  appointment: Appointment,
  service: Service,
  employee: Employee,
  customer: CustomerData
}
