import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceCategory} from "../../../../interfaces/service-category";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  expandedCategoryId: number | null = null;

  @Input() categories: ServiceCategory[] = [];

  @Output() startEditing = new EventEmitter<ServiceCategory>();
  @Output() onDelete = new EventEmitter<number>();

  constructor(
    private categoryService: CategoryService,
  ) {
  }

  startEdit(serviceCategory: ServiceCategory) {
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
      const category = this.categories.find(c => c.id === id);
      if (category) {
        this.loadImage(category);
      }
    }
  }

  loadImage(category: ServiceCategory) {
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
