import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicesFilter'
})
export class ServicesFilterPipe implements PipeTransform {

  transform(items: any[], text: string, categoryName: string): any[] {
    if (!items) return [];

    let filteredItems = text ? this.filterByText(items, text) : items;
    return categoryName ? this.filterByCategory(filteredItems, categoryName) : filteredItems;
  }

  private filterByText(items: any[], searchText: string): any[] {
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchText)
          || item.description.toLowerCase().includes(searchText);
    });
  }

  private filterByCategory(items: any[], categoryName: string): any[] {
    return items.filter(item => item.categoryName === categoryName);
  }
}
