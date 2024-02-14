import {Component, Input} from '@angular/core';
import {BusinessType} from "../../interfaces/business-type";
import {MatDialog} from "@angular/material/dialog";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {BusinessesFilterModalComponent} from "../businesses-filter-modal/businesses-filter-modal.component";

@Component({
  selector: 'app-business-filter',
  templateUrl: './business-filter.component.html',
  styleUrls: ['./business-filter.component.css']
})
export class BusinessFilterComponent {

  selectedCity: string | undefined;

  @Input() set cityFilter(city: string | undefined) {
    console.log('in cityFilter setter', city)
    this.selectedCity = city;
    this.updateFilterCount();
  }

  selectedBusinessType: BusinessType | undefined;

  @Input() set businessTypeFilter(businessType: BusinessType | undefined) {
    console.log('in businessTypeFilter setter', businessType)
    this.selectedBusinessType = businessType;
    this.updateFilterCount();
  }

  selectedCategory: PredefinedCategory | undefined;

  @Input() set categoryFilter(category: PredefinedCategory | undefined) {
    console.log('in categoryFilter setter', category)
    this.selectedCategory = category;
    this.updateFilterCount();
  }

  filterCount: number = 0;

  @Input() businessTypes: BusinessType[] | undefined;
  @Input() predefinedCategories: PredefinedCategory[] | undefined;

  constructor(private dialog: MatDialog) {
  }

  private updateFilterCount() {
    this.filterCount = 0;
    if (this.selectedCity) {
      this.filterCount++;
    }
    if (this.selectedBusinessType) {
      this.filterCount++;
    }
    if (this.selectedCategory) {
      this.filterCount++;
    }
  }

  showFilterModal() {
    console.log(`all data: ${this.selectedCity}, ${this.selectedBusinessType}, ${this.selectedCategory}, ${this.businessTypes}, ${this.predefinedCategories}`);
    const dialogRef = this.dialog.open(BusinessesFilterModalComponent, {
      width: 'auto',
      // data: {category: category}
      data: {
        cityFilter: this.selectedCity,
        businessTypeFilter: this.selectedBusinessType,
        categoryFilter: this.selectedCategory,
        businessTypes: this.businessTypes,
        predefinedCategories: this.predefinedCategories,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
