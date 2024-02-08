import { Pipe, PipeTransform } from '@angular/core';
import {Service} from "../interfaces/service";

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(services: Service[], categoryId: number): Service[] {
    if (!services || !categoryId) {
      return services;
    }
    return services.filter(service => service.categoryId === categoryId);
  }

}
