import { Pipe, PipeTransform } from '@angular/core';
import {Service} from "../openapi";

@Pipe({
  name: 'filterBySubcategory'
})
export class FilterBySubcategoryPipe implements PipeTransform {

  transform(services: Service[], subcategory: string): Service[] {
    if (!services || !subcategory) {
      return services;
    }
    // return services.filter(service => service.subCategoryName === subcategory);
    return [];
  }

}
