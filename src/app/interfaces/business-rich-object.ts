import {UserDefinedCategory} from "./user-defined-category";
import {Service} from "./service";
import {Business} from "./business";

export interface BusinessRichObject {
  business: Business;
  services: Service[];
  userDefinedCategories: UserDefinedCategory[];
}

