import {Pipe, PipeTransform} from '@angular/core';
import {Service} from "../../../interfaces/service";

@Pipe({
  name: 'servicesFilter'
})
export class ServicesFilterPipe implements PipeTransform {

  transform(items: Service[], text: string, subcategoryId: number | undefined): Service[] {
    if (!items) return [];

    let filteredItems = text ? this.filterByText(items, text) : items;
    return subcategoryId ? this.filterByCategory(filteredItems, subcategoryId) : filteredItems;
  }

  private filterByText(items: Service[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(searchText)
        || item.description.toLowerCase().includes(searchText);
    });
  }

  private filterByCategory(items: Service[], subcategoryId: number): Service[] {
    return items.filter(service => service.subcategoryId === +subcategoryId);
  }
}
