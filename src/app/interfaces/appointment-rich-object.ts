import {Appointment} from "./appointment";
import {Employee} from "./employee";
import {Service} from "./service";
import {CustomerData} from "./customer-data";
import { Business } from "./business";
import {Review} from "./review";

export interface AppointmentRichObject {
  appointment: Appointment,
  service: Service,
  employee: Employee,
  customer: CustomerData,
  business: Business,
  review: Review
}
