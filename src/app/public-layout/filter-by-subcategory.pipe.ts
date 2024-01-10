import { Pipe, PipeTransform } from '@angular/core';
import {Service} from "../interfaces/service";

@Pipe({
  name: 'filterBySubcategory'
})
export class FilterBySubcategoryPipe implements PipeTransform {

  transform(services: Service[], subcategoryId: number): Service[] {
    if (!services || !subcategoryId) {
      return services;
    }
    return services.filter(service => service.subcategoryId === subcategoryId);
  }

}
