import {Pipe, PipeTransform} from '@angular/core';
import {Service} from "../../../interfaces/service";

@Pipe({
  name: 'servicesFilter'
})
export class ServicesFilterPipe implements PipeTransform {

  transform(items: Service[], text: string, categoryId: number | undefined): Service[] {
    if (!items) return [];

    let filteredItems = text ? this.filterByText(items, text) : items;
    return categoryId ? this.filterByCategory(filteredItems, categoryId) : filteredItems;
  }

  private filterByText(items: Service[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(searchText)
        || item.description.toLowerCase().includes(searchText);
    });
  }

  private filterByCategory(items: Service[], categoryId: number): Service[] {
    return items.filter(service => service.categoryId === +categoryId);
  }
}
