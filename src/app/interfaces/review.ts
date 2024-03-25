export interface Review {
  id: number;
  appointmentId: number;
  service: number;
  priceQuality: number;
  hygiene: number;
  ambience: number;
  comment: string;
}
