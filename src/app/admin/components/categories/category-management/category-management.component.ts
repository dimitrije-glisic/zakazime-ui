import {Component} from '@angular/core';
import {PredefinedCategoryService} from "../../../services/predefined-category.service";
import {PredefinedCategory} from "../../../../interfaces/predefined-category";
import {BusinessTypeService} from "../../../services/business-type.service";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent {
  categories: PredefinedCategory[] = [];
  businessTypes: BusinessType[] = [];

  categoryInEditMode: PredefinedCategory | null = null;

  constructor(private categoryService: PredefinedCategoryService, private businessTypeService: BusinessTypeService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.loadBusinessTypes();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  loadBusinessTypes() {
    this.businessTypeService.getAll().subscribe(data => {
      this.businessTypes = data;
    });
  }

  delete(id: number) {
    this.categoryService.delete(id).subscribe(() => {
      this.loadCategories();
    });
    this.loadCategories();
  }

  add(serviceCategory: PredefinedCategory | FormData) {
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
