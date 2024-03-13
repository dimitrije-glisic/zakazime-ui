import {CustomerData} from "./customer-data";

export interface EmployeeServiceIdPair {
  employeeId?: number;
  serviceId: number;
}

export interface MultiServiceAppointmentRequest {
  businessId: number;
  employeeServicePairs: EmployeeServiceIdPair[];
  customerData: CustomerData;
  startTime: string;
}
