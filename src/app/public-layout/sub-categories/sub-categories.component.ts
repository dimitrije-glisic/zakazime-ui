import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent {
  businessType: string | undefined;
  category: string | undefined;

  businessses: Business[] | undefined;
  subCategories: string[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private businessServiceMock: BusinessServiceMockService) {
    this.route.params.subscribe(
      (params) => {
        this.businessType = params['title'].toUpperCase();
        this.category = params['categoryTitle'].toUpperCase();
        this.loadData(params['title'].toUpperCase(), params['categoryTitle'].toUpperCase());
      }
    )
  }

  loadData(typeTitle: string, categoryTitle: string) {
    this.businessses = this.businessServiceMock.getBusinesses();

    this.subCategories = [...new Set(
      this.businessses
        .filter((business: Business) => business.type === typeTitle)
        .flatMap((business: Business) => business.services)
        .filter((service: Service) => service.categoryName.toUpperCase() === categoryTitle)
        .map((service: Service) => service.subCategoryName) as string[]
    )];

  }

  getCategoryImageUrl(category: string): string {
    return this.businessServiceMock.getCategoryImageUrl(category);
  }

  onSubCategoryClick(subCategory: string) {
    this.router.navigate([this.businessType?.toLowerCase(), this.category?.toLowerCase(), subCategory.toLowerCase()]);
  }

}
