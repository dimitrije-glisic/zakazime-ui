import {UserDefinedCategory} from "./user-defined-category";
import {Service} from "./service";
import {Business} from "./business";
import {Employee} from "./employee";

export interface BusinessRichObject {
  business: Business;
  services: Service[];
  userDefinedCategories: UserDefinedCategory[];
  employees: Employee[];
}

