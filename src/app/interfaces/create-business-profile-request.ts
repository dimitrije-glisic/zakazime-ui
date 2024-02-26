export interface CreateBusinessProfileRequest {
  name: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
  city: string;
  address: string;
  serviceKinds: string[];
  yearOfEstablishment: number;
}

