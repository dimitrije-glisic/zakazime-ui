import {Component} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ServiceCategory} from "../../../../interfaces/service-category";
import {BusinessTypeService} from "../../../services/business-type.service";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent {
  categories: ServiceCategory[] = [];
  businessTypes: BusinessType[] = [];

  categoryInEditMode: ServiceCategory | null = null;

  constructor(private categoryService: CategoryService, private businessTypeService: BusinessTypeService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.loadBusinessTypes();
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  loadBusinessTypes() {
    this.businessTypeService.getBusinessTypes().subscribe(data => {
      this.businessTypes = data;
    });
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => {
      this.loadCategories();
    });
    this.loadCategories();
  }

  add(serviceCategory: ServiceCategory | FormData) {
    if (serviceCategory instanceof FormData) {
      console.log('add with image');

      this.categoryService.createWithImage(serviceCategory).subscribe(() => {
        this.loadCategories();
      });
    } else {
      console.log('add without image');
      console.log(serviceCategory);
      this.categoryService.create(serviceCategory).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
