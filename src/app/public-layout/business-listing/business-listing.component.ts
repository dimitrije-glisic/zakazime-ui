import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-business-listing',
  templateUrl: './business-listing.component.html',
  styleUrls: ['./business-listing.component.css']
})
export class BusinessListingComponent {

  categories: string[] | undefined;
  businesses: Business[] | undefined;

  constructor(private route: ActivatedRoute,
    private businessServiceMock: BusinessServiceMockService) {
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
    const businesses = this.businessServiceMock.getBusinesses();
    const typeTitleUpper = typeTitle.toUpperCase();
    const categoryTitleUpper = categoryTitle.toUpperCase();
    const subCategoryTitleUpper = subCategoryTitle.toUpperCase();
  
    const matchedBusinessNames = new Set(
      businesses
        .filter(business => business.type.toUpperCase() === typeTitleUpper)
        .flatMap(business => business.services)
        .filter(service => 
          service.categoryName.toUpperCase() === categoryTitleUpper &&
          service.subCategoryName?.toUpperCase() === subCategoryTitleUpper
        )
        .map(service => service.businessName)
    );

    this.businesses = businesses.filter(business => matchedBusinessNames.has(business.name));
  }
  

  getCityImageUrl(city: string): string {
    return this.businessServiceMock.getCityImageUrl(city);
  }

  getCategoryImageUrl(category: string): string {
    return this.businessServiceMock.getCategoryImageUrl(category);
  }

  getServiceImageUrl(serviceName: string): string {
    return this.businessServiceMock.getServiceImageUrl(serviceName);
  }


}
