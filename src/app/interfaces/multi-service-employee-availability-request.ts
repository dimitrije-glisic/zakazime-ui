import {EmployeeServiceIdPair} from "./multi-service-appointment-request";

export interface MultiServiceEmployeeAvailabilityRequest {
  businessId: number;
  employeeServicePairs: EmployeeServiceIdPair[];
  date: Date;
}
