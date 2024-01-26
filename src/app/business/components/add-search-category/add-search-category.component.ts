import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {PredefinedCategory} from "../../../interfaces/predefined-category";
import {BusinessType} from "../../../interfaces/business-type";

@Component({
  selector: 'app-add-search-category',
  templateUrl: './add-search-category.component.html',
  styleUrls: ['./add-search-category.component.css']
})
export class AddSearchCategoryComponent implements OnChanges {
  @Input() businessTypes: BusinessType[] | undefined;
  @Input() categories: PredefinedCategory[] | undefined;
  @Output() selectedCategoriesEmitter: EventEmitter<PredefinedCategory[]> = new EventEmitter<PredefinedCategory[]>();

  selectedCategories: PredefinedCategory[] = [];
  selectedBusinessType: BusinessType | undefined;
  filteredCategories: PredefinedCategory[] = [];

  ngOnChanges() {
    this.selectedCategories = [];
    this.selectedBusinessType = this.businessTypes![0];
    this.filteredCategories = this.filterCategories(this.selectedBusinessType);
  }

  addCategory(category: PredefinedCategory) {
    this.selectedCategories.push(category);
  }

  removeCategory(category: PredefinedCategory) {
    this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory.id !== category.id);
  }

  emitSelectedCategories() {
    this.selectedCategoriesEmitter.emit(this.selectedCategories);
  }

  filterByBusinessType(businessType: BusinessType | undefined) {
    if (this.selectedBusinessType === businessType) {
      return;
    }
    this.selectedBusinessType = businessType;
    this.filteredCategories = this.filterCategories(businessType);
  }

  // For now - always one business type is selected
  resetFilter() {
    this.selectedBusinessType = undefined;
    this.filteredCategories = {...this.categories!};
  }

  filterCategories(businessType: BusinessType | undefined): PredefinedCategory[] {
    return this.categories!.filter(c => {
      return businessType ? c.businessTypeId === businessType.id : true;
    });
  }

  toggleCategory(category: PredefinedCategory) {
    if (this.selectedCategories.includes(category)) {
      this.removeCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  saveAll() {
    this.selectedCategoriesEmitter.emit(this.selectedCategories);
    this.selectedCategories = [];
  }
}
