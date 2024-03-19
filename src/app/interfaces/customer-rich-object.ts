import {AppointmentRichObject} from "./appointment-rich-object";
import {Customer} from "./customer";

export interface CustomerRichObject {
  customerData: Customer,
  appointments: AppointmentRichObject[]
}
