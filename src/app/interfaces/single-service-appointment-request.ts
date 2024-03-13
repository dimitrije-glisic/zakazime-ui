import {CustomerData} from "./customer-data";

export interface SingleServiceAppointmentRequest {
  businessId: number;
  employeeId: number;
  serviceId: number;
  customerData: CustomerData;
  //backend - @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
  startTime: string;
}
