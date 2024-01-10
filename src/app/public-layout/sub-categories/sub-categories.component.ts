import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent {

  backgroundImg: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;

  businessType: string | undefined;
  category: string | undefined;

  businesses: Business[] | undefined;
  subCategories: string[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(
      (params) => {
        this.businessType = params['title'].toUpperCase();
        this.category = params['categoryTitle'].toUpperCase();
        this.loadData(params['title'].toUpperCase(), params['categoryTitle'].toUpperCase());
      }
    )
  }

  loadData(typeTitle: string, categoryTitle: string) {
    // this.businesses = this.businessServiceMock.getBusinesses();
    this.businesses = [];

    // this.subCategories = [...new Set(
    //   this.businesses
    //     .filter((business: Business) => business.type === typeTitle)
    //     .flatMap((business: Business) => business.services)
    //     // .filter((service: Service) => loadSubcategory(service).toUpperCase() === categoryTitle)
    //     // .map((service: Service) => loadSubcategory(service)) as string[]
    // )];

    // this.subCategories = loadSubcategories();

    // this.backgroundImg = this.getSubCategoryImageUrl(this.subCategories[0]);
    this.title = categoryTitle;
    this.subtitle = 'Sub Categories Subtitle';

  }

  getCategoryImageUrl(category: string): string {
    // return this.businessServiceMock.getCategoryImageUrl(category);
    return '';
  }

  getSubCategoryImageUrl(subCategory: string): string {
    // return this.businessServiceMock.getSubCategoryImageUrl(subCategory);
    return '';
  }

  onSubCategoryClick(subCategory: string) {
    this.router.navigate(['/business-type', this.businessType?.toLowerCase(), this.category?.toLowerCase(), subCategory.toLowerCase()]);
  }

}
