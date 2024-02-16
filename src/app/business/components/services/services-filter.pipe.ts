import {Pipe, PipeTransform} from '@angular/core';
import {Service} from "../../../interfaces/service";

@Pipe({
  name: 'servicesFilter'
})
export class ServicesFilterPipe implements PipeTransform {

  transform(items: Service[], text: string): Service[] {
    if (!items) return [];
    return text ? this.filterByText(items, text) : items;
  }

  private filterByText(items: Service[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(searchText)
        || item.description.toLowerCase().includes(searchText);
    });
  }

}
