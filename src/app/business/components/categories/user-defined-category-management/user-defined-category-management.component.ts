import {Component, Input} from '@angular/core';
import {UserDefinedCategoryService} from "../../../services/user-defined-category.service";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {CreateUserDefinedCategoryRequest} from "../../../../interfaces/create-user-defined-category-request";
import {UpdateUserDefinedCategoryRequest} from "../../../../interfaces/update-user-defined-category-request";

@Component({
  selector: 'app-user-defined-category-management',
  templateUrl: './user-defined-category-management.component.html',
  styleUrls: ['./user-defined-category-management.component.css']
})
export class UserDefinedCategoryManagementComponent {

  @Input() businessId: number | undefined;
  userDefinedCategories: UserDefinedCategory[] = [];
  categoryInEditMode: UserDefinedCategory | null = null;

  constructor(private userDefinedCategoryService: UserDefinedCategoryService) {
  }

  ngOnInit(): void {
    this.loadCategories(this.businessId!);
  }

  private loadCategories(id: number) {
    return this.userDefinedCategoryService.getAll(id).subscribe(
      (categories: UserDefinedCategory[]) => {
        this.userDefinedCategories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  add($event: UserDefinedCategory) {
    const createReq: CreateUserDefinedCategoryRequest = {
      title: $event.title,
    }
    this.userDefinedCategoryService.create(this.businessId!, createReq).subscribe(
      () => {
        this.loadCategories(this.businessId!);
      },
      (error: any) => {
        console.error('Error adding category:', error);
      }
    );
  }

  update($event: UpdateUserDefinedCategoryRequest) {
    this.userDefinedCategoryService.update(this.businessId!, this.categoryInEditMode!.id, $event).subscribe(
      () => {
        this.loadCategories(this.businessId!);
      },
      (error: any) => {
        console.error('Error updating category:', error);
      }
    );
  }
}
