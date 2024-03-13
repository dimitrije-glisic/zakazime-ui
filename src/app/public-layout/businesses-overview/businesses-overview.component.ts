import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BusinessService} from "../../business/services/business-service";
import {Business} from "../../interfaces/business";
import {BusinessType} from "../../interfaces/business-type";
import {BusinessTypeService} from "../../admin/services/business-type.service";
import {PredefinedCategoryService} from "../../admin/services/predefined-category.service";
import {PredefinedCategory} from "../../interfaces/predefined-category";

@Component({
  selector: 'app-businesses-overview',
  templateUrl: './businesses-overview.component.html',
  styleUrls: ['./businesses-overview.component.css']
})
export class BusinessesOverviewComponent implements OnInit {

  cityFilter: string | undefined;
  businessTypeFilterString: string | undefined;
  businessTypeFilter: BusinessType | undefined;
  categoryFilterString: string | undefined;
  categoryFilter: PredefinedCategory | undefined;

  businesses: Business[] | undefined;
  businessTypes: BusinessType[] | undefined;
  predefinedCategories: PredefinedCategory[] | undefined;
  cities: string[] | undefined;

  pageTitle: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private businessService: BusinessService,
              private router: Router, private businessTypeService: BusinessTypeService,
              private predefinedCategoryService: PredefinedCategoryService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-type': businessType, category} = params;
      this.cityFilter = city;
      this.businessTypeFilterString = businessType;
      this.categoryFilterString = category;

      this.loadBusinesses(city, businessType, category);
      this.loadBusinessTypesAndCategories();

      if (!this.businessTypeFilterString) {
        this.setTitleCity(city);
      }
      if (this.businessTypeFilterString && !this.categoryFilterString) {
        this.setTitleCityAndBusinessType(city, businessType);
      }
    });
  }

  private setTitleCity(city: string) {
    const cityUpperCase = city.charAt(0).toUpperCase() + city.slice(1);
    this.pageTitle = 'Svi saloni ' + cityUpperCase;
  }

  private setTitleCityAndBusinessType(city: string, businessTypeSlug: string) {
    let businessTypeTitle = businessTypeSlug.split('-').join(' ');
    businessTypeTitle = businessTypeTitle.charAt(0).toUpperCase() + businessTypeTitle.slice(1);
    const cityUpperCase = city.charAt(0).toUpperCase() + city.slice(1);
    this.pageTitle = businessTypeTitle + ' ' + cityUpperCase;
  }

  private loadBusinesses(city: string, businessType?: string, category?: string): void {
    if (!businessType && !category) {
      this.businessService.getBusinessesInCity(city).subscribe(businesses => {
        this.businesses = businesses;
        this.cities = this.businesses!.map(b => b.city).filter((value, index, self) => self.indexOf(value) === index);
      });
    } else {
      this.businessService.searchBusinesses(city, businessType, category).subscribe(businesses => {
        this.businesses = businesses;
        this.cities = this.businesses!.map(b => b.city).filter((value, index, self) => self.indexOf(value) === index);
      });
    }
  }

  private loadBusinessTypes() {
    this.businessTypeService.getAll().subscribe(businessTypes => {
      this.businessTypes = businessTypes;
      this.businessTypeFilter = this.businessTypes!.find(bt => bt.slug === this.businessTypeFilterString);
    });
  }

  private loadBusinessTypesAndCategories() {
    this.businessTypeService.getAll().subscribe(businessTypes => {
      this.businessTypes = businessTypes;
      this.businessTypeFilter = this.businessTypes!.find(bt => bt.slug === this.businessTypeFilterString);
      const businessType = this.businessTypes!.find(bt => bt.slug === this.businessTypeFilterString);
      this.predefinedCategoryService.getAll().subscribe(categories => {
        this.predefinedCategories = categories.filter(c => c.businessTypeId === businessType!.id);
        this.categoryFilter = this.predefinedCategories!.find(c => c.slug === this.categoryFilterString);
      });
    });
  }

  filterByBusinessType(businessType: BusinessType) {
    const businessTypeFilter = businessType.slug;
    this.router.navigate([this.cityFilter, businessTypeFilter]);
  }

  filterByCategory(category: PredefinedCategory) {
    const categoryFilter = category.slug;
    this.router.navigate([this.cityFilter, this.businessTypeFilterString, categoryFilter]);
  }

  formatUrl(businessName: string) {
    const formattedCity = this.cityFilter!.toLowerCase().split(' ').join('-');
    const formattedName = businessName.toLowerCase().split(' ').join('-');
    return `/business/${formattedCity}/${formattedName}`;
  }

}
