import {Component, OnInit} from '@angular/core';
import {BusinessType} from "../../interfaces/business-type";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {PredefinedCategoryService} from "../../admin/services/predefined-category.service";
import {BusinessTypeService} from "../../admin/services/business-type.service";
import {Business} from "../../interfaces/business";
import {BusinessService} from "../../business/services/business-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  businessTypes: BusinessType[] | undefined;
  categories: PredefinedCategory[] | undefined;
  topCategories: PredefinedCategory[] | undefined;
  businesses: Business[] | undefined;
  cities: string[] | undefined;
  city: string = 'Beograd';
  showCitiesList: boolean = false;

  constructor(private businessTypeService: BusinessTypeService, private predefinedCategoryService: PredefinedCategoryService,
              private businessService: BusinessService, private router: Router) {
  }

  ngOnInit(): void {
    this.businessTypeService.getAll().subscribe(businessTypes => {
      this.businessTypes = businessTypes;
    });
    this.predefinedCategoryService.getAll().subscribe(categories => {
      this.categories = categories;
      //randomly select 16 categories
      this.topCategories = categories.sort(() => Math.random() - Math.random()).slice(0, 16);
    });
    this.businessService.getAll().subscribe(businesses => {
      this.businesses = businesses;
      // this.cities = new Set(...businesses.map(business => business.city));
      this.cities = businesses.map(business => business.city).filter((value, index, self) => self.indexOf(value) === index);
    });

  }

  onBusinessTypeClick(type: BusinessType) {
    //go to page for all businesses that provide this type of service in city
    const city = this.city.toLowerCase();
    const businessType = type.slug;
    this.router.navigate(['discover', city, businessType]);
  }

  onCategoryClick(category: PredefinedCategory) {
    //go to page for all businesses that provide this type of service in city
    const businessType = this.businessTypes?.find(businessType => businessType.id === category.businessTypeId);
    const city = this.city.toLowerCase().split(' ').join('-');
    const businessTypeSlug = businessType!.slug;
    const categorySlug = category.slug;

    this.router.navigate(['discover', city, businessTypeSlug, categorySlug]);
  }

  toggleCitiesList(event: Event) {
    event.preventDefault();
    this.showCitiesList = !this.showCitiesList;
  }

  selectCity(selectedCity: string) {
    this.city = selectedCity;
    this.showCitiesList = false;
    const city = this.city.toLowerCase().split(' ').join('-');
    this.router.navigate(['discover', city, 'svi-saloni']);
  }
}
