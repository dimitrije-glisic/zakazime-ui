import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  backgroundImg = '/assets/images/gradient.jpeg';
  title = 'Dobrodosli na ZakaziMe';
  subtitle = 'Pronadjite najbolju uslugu za svoje potrebe';

  businessses: Business[] | undefined;
  categories: string[] | undefined;

  businessType: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private businessServiceMock: BusinessServiceMockService) {
    this.route.params.subscribe(
      (params) => {
        this.businessType = params['title'].toUpperCase();
        this.loadData(params['title'].toUpperCase());
      }
    )
  }

  loadData(title: string) {
    this.businessses = this.businessServiceMock.getBusinesses();

    // this.categories = [...new Set(
    //   this.businessses
    //     .filter((business: Business) => business.type === title)
    //     .flatMap((business: Business) => business.services)
    //     .map((service: Service) => service.categoryName) as string[]
    // )];

    this.backgroundImg = this.getBusinessesTypeImageUrl(title);
  }

  getBusinessesTypeImageUrl(type: string): string {
    return this.businessServiceMock.getTypeImageUrl(type);
  }

  getCategoryImageUrl(category: string): string {
    return this.businessServiceMock.getCategoryImageUrl(category);
  }

  onCategoryClick(category: string) {
    this.router.navigate(['/business-type', this.businessType?.toLowerCase(), category.toLowerCase()]);
  }

}
