import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {BusinessType} from "../../interfaces/business-type";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatRadioChange} from "@angular/material/radio";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {BusinessService} from "../../business/services/business-service";

@Component({
  selector: 'app-businesses-filter-modal',
  templateUrl: './businesses-filter-modal.component.html',
  styleUrls: ['./businesses-filter-modal.component.css']
})
export class BusinessesFilterModalComponent {
  selectedCity: string | undefined;
  selectedBusinessType: BusinessType | undefined;
  selectedCategory: PredefinedCategory | undefined;
  businessTypes: BusinessType[] | undefined;
  predefinedCategories: PredefinedCategory[] | undefined;
  categoriesByBusinessType: Map<number, PredefinedCategory[]> | undefined;
  cities: string[] | undefined;

  constructor(
    private dialogRef: MatDialogRef<BusinessesFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private businessService: BusinessService
  ) {

    this.selectedCity = data.cityFilter;
    this.selectedBusinessType = data.businessTypeFilter;
    this.selectedCategory = data.categoryFilter;
    this.businessTypes = data.businessTypes;
    this.predefinedCategories = data.predefinedCategories;
    this.loadCities();
    this.makeBusinessType2CategoryMap();
  }

  private loadCities() {
    this.businessService.getAllActive().subscribe(businesses => {
      this.cities = businesses.map(business => business.city).filter((value, index, self) => self.indexOf(value) === index);
    });
  }

  makeBusinessType2CategoryMap(): void {
    this.categoriesByBusinessType = new Map<number, PredefinedCategory[]>();
    if (this.businessTypes && this.predefinedCategories) {
      this.businessTypes.forEach(businessType => {
        const categories =
          this.predefinedCategories!.filter(category => category.businessTypeId === businessType.id);
        this.categoriesByBusinessType!.set(businessType.id, categories);
      });
    }
  }

  onCityChange(cityChange: MatButtonToggleChange) {
    this.selectedCity = cityChange.value.toLowerCase().split(' ').join('-');
    this.doRoute();
  }

  onBusinessTypeChange(businessTypeChange: MatButtonToggleChange) {
    this.selectedBusinessType = businessTypeChange.value;
    this.selectedCategory = undefined;
    this.doRoute();
  }

  onCategoryChange(categoryChange: MatRadioChange) {
    this.selectedCategory = categoryChange.value;
    this.doRoute();
  }

  doRoute() {
    const pathArray: string[] = ['discover', this.selectedCity!]
    if (this.selectedBusinessType) {
      pathArray.push(this.selectedBusinessType.slug);
      if (this.selectedCategory) {
        pathArray.push(this.selectedCategory.slug);
      }
    } else {
      pathArray.push('svi-saloni');
    }
    this.router.navigate(pathArray);
    this.dialogRef.close();
  }

}
