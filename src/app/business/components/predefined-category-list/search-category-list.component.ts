import {Component, Input, OnChanges} from '@angular/core';
import {PredefinedCategory} from "../../../interfaces/predefined-category";
import {BusinessType} from "../../../interfaces/business-type";

@Component({
  selector: 'app-search-category-list',
  templateUrl: './search-category-list.component.html',
  styleUrls: ['./search-category-list.component.css']
})
export class SearchCategoryListComponent implements OnChanges {
  @Input() categories: PredefinedCategory[] | undefined;
  @Input() businessTypes: BusinessType[] | undefined;

  categoriesByBusinessType: Map<BusinessType, PredefinedCategory[]> = new Map<BusinessType, PredefinedCategory[]>();

  ngOnChanges(): void {
    if (this.businessTypes && this.categories) {
      this.updateCategoriesByBusinessType();
    }
  }

  updateCategoriesByBusinessType(): void {
    this.categoriesByBusinessType.clear(); // Clear existing mappings
    this.businessTypes!.forEach(businessType => {
      const filteredCategories = this.filterCategories(businessType);
      this.categoriesByBusinessType.set(businessType, filteredCategories);
    });
  }

  filterCategories(businessType: BusinessType | undefined): PredefinedCategory[] {
    return this.categories!.filter(c => {
      return businessType ? c.businessTypeId === businessType.id : true;
    });
  }

}
