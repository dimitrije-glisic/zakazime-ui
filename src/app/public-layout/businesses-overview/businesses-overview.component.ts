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
  businessTypeFilter: string | undefined;
  categoryFilter: string | undefined;

  businesses: Business[] | undefined;
  businessTypes: BusinessType[] | undefined;
  predefinedCategories: PredefinedCategory[] | undefined;

  constructor(private activatedRoute: ActivatedRoute, private businessService: BusinessService,
              private router: Router, private businessTypeService: BusinessTypeService,
              private predefinedCategoryService: PredefinedCategoryService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-type': businessType, category} = params;
      this.cityFilter = city;
      this.businessTypeFilter = businessType;
      this.categoryFilter = category;

      this.loadBusinesses(city, businessType, category);
      if (!this.businessTypeFilter) {
        this.loadBusinessTypes();
      }
      if (this.businessTypeFilter && !this.categoryFilter) {
        this.loadBusinessTypesAndCategories();
      }
    });
  }

  private loadBusinesses(city: string, businessType?: string, category?: string): void {
    if (!businessType && !category) {
      this.businessService.getBusinessesInCity(city).subscribe(businesses => {
        this.businesses = businesses;
      });
    } else {
      this.businessService.searchBusinesses(city, businessType, category).subscribe(businesses => {
        this.businesses = businesses;
      });
    }
  }

  private loadBusinessTypes() {
    this.businessTypeService.getAll().subscribe(businessTypes => {
      this.businessTypes = businessTypes;
    });
  }

  private loadBusinessTypesAndCategories() {
    this.businessTypeService.getAll().subscribe(businessTypes => {
      this.businessTypes = businessTypes;
      const businessType = this.businessTypes!.find(bt => bt.slug === this.businessTypeFilter);
      this.predefinedCategoryService.getAll().subscribe(categories => {
        this.predefinedCategories = categories.filter(c => c.businessTypeId === businessType!.id);
      });
    });
  }

  filterByBusinessType(businessType: BusinessType) {
    const businessTypeFilter = businessType.slug;
    this.router.navigate([this.cityFilter, businessTypeFilter]);
  }

  filterByCategory(category: PredefinedCategory) {
    const categoryFilter = category.slug;
    this.router.navigate([this.cityFilter, this.businessTypeFilter, categoryFilter]);
  }

}
