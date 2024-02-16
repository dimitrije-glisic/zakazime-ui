import {UserDefinedCategory} from "./user-defined-category";
import {Service} from "./service";

export interface BusinessRichObject {
  id: number;
  name: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  address: string;
  profileImageUrl?: string;
  services: Service[];
  userDefinedCategories: UserDefinedCategory[];
}

