export interface Appointment {
  id: number;
  serviceId: number;
  employeeId: number;
  businessId: number;
  startTime: string;
  endTime: string;
  status: string;
  customerId: number;
  createdAt: string;
}
