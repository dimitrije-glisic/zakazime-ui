import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { BusinessServiceMockService } from 'src/app/business-service-mock.service';
import { Business } from 'src/app/interfaces/business.interface';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-business-type-home',
  templateUrl: './business-type-home.component.html',
  styleUrls: ['./business-type-home.component.css']
})
export class BusinessTypeHomeComponent {
  businessses: Business[] | undefined;
  categories: string[] | undefined;

  topLocations: string[] | undefined;
  topCategories: string[] | undefined;
  topServices: Service[] | undefined;

  constructor(private route: ActivatedRoute,
    private businessServiceMock: BusinessServiceMockService) {
    const title = this.route.params.subscribe(
      (params) => {
        this.loadData(params['title'].toUpperCase());
      }
    )
  }

  loadData(title: string) {
    this.businessses = this.businessServiceMock.getBusinesses();

    console.log(title);

    this.categories = this.businessses.filter(business => business.type === title)
      .map(business => business.services)
      .reduce((acc, services) => acc.concat(services), [])
      .map(service => service.categoryName)

    this.topLocations = this.pickRandomElements(this.businessses.map(b => b.city), 3);
    this.topCategories = this.pickRandomElements(this.categories, 6);
    this.topServices = this.pickRandomElements(
      this.businessses.flatMap(business => business.services), 6
    );
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

  private pickRandomElements<T>(array: T[], count: number): T[] {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  }

}


