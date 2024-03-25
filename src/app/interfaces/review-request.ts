export interface ReviewRequest {
  appointmentId: number;
  service: number;
  priceQuality: number;
  hygiene: number;
  ambience: number;
  comment: string;
}
