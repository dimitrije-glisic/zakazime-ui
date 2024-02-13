import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-business-listing',
  templateUrl: './business-listing.component.html',
  styleUrls: ['./business-listing.component.css']
})
export class BusinessListingComponent {

  categories: string[] | undefined;
  businesses: Business[] | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params) => {
        const typeTitle = params['title'].toUpperCase();
        const categoryTitle = params['categoryTitle'].toUpperCase();
        const subCategoryTitle = params['subCategoryTitle'].toUpperCase();
        this.loadData(typeTitle, categoryTitle, subCategoryTitle);
      }
    )
  }

  loadData(typeTitle: string, categoryTitle: string, subCategoryTitle: string) {
    const businesses = [];
    const typeTitleUpper = typeTitle.toUpperCase();
    const categoryTitleUpper = categoryTitle.toUpperCase();
    const subCategoryTitleUpper = subCategoryTitle.toUpperCase();

    // const matchedBusinessNames = new Set(
    //   businesses
    //     .filter(business => business.type.toUpperCase() === typeTitleUpper)
    //     .flatMap(business => business.services)
    //     .filter(service =>
    //       service.categoryName.toUpperCase() === categoryTitleUpper &&
    //       service.subCategoryName?.toUpperCase() === subCategoryTitleUpper
    //     )
    //     .map(service => service.businessName)
    // );

    // this.businesses = businesses.filter(business => matchedBusinessNames.has(business.name));
  }


  getCityImageUrl(city: string): string {
    // return this.businessServiceMock.getCityImageUrl(city);
    return '';
  }

  getCategoryImageUrl(category: string): string {
    // return this.businessServiceMock.getCategoryImageUrl(category);
    return '';
  }

  getServiceImageUrl(serviceName: string): string {
    // return this.businessServiceMock.getServiceImageUrl(serviceName);
    return '';
  }


}
