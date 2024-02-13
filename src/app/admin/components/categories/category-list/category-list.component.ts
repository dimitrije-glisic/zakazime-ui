import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PredefinedCategory} from "../../../../interfaces/predefined-category";
import {PredefinedCategoryService} from "../../../services/predefined-category.service";
import {BusinessType} from "../../../../interfaces/business-type";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  @Input() set categories(value: PredefinedCategory[]) {
    this.allCategories = value;
    this.filteredCategories = this.filterCategories(this.selectedBusinessType);
  }

  @Input() businessTypes: BusinessType[] = [];
  @Output() startEditing = new EventEmitter<PredefinedCategory>();
  @Output() onDelete = new EventEmitter<number>();

  allCategories: PredefinedCategory[] = [];
  expandedCategoryId: number | null = null;
  selectedBusinessType: BusinessType | null = null;
  filteredCategories: PredefinedCategory[] = [];

  constructor(
    private categoryService: PredefinedCategoryService,
  ) {
  }

  filterByBusinessType(businessType: BusinessType | null) {
    if (this.selectedBusinessType === businessType) {
      this.resetFilter();
    } else {
      this.selectedBusinessType = businessType;
      this.filteredCategories = this.filterCategories(businessType);
    }
  }

  resetFilter() {
    this.selectedBusinessType = null;
    this.filteredCategories = this.allCategories;
  }

  filterCategories(businessType: BusinessType | null): PredefinedCategory[] {
    return this.allCategories.filter(c => {
      return businessType ? c.businessTypeId === businessType.id : true;
    });
  }

  startEdit(serviceCategory: PredefinedCategory) {
    this.startEditing.emit(serviceCategory);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  toggleExpand(id: number) {
    if (this.expandedCategoryId === id) {
      this.expandedCategoryId = null;
    } else {
      this.expandedCategoryId = id;
      const category = this.allCategories.find(c => c.id === id);
      if (category) {
        this.loadImage(category);
      }
    }
  }

  loadImage(category: PredefinedCategory) {
    this.categoryService.getImage(category.id).subscribe(
      imageBlob => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          category.imageUrl = reader.result as string;
        }, false);

        if (imageBlob) {
          reader.readAsDataURL(imageBlob);
        }
      },
      error => {
        console.error('Error loading image:', error);
      }
    );
  }

}
