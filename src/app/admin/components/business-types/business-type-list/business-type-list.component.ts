import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BusinessType} from "../../../../interfaces/business-type";
import {BusinessTypeService} from "../../../services/business-type.service";

@Component({
  selector: 'app-business-type-list',
  templateUrl: './business-type-list.component.html',
  styleUrls: ['./business-type-list.component.css']
})
export class BusinessTypeListComponent {
  expandedBusinessTypeId: number | null = null;

  @Input() businessTypes: BusinessType[] = [];
  @Output() startEditing = new EventEmitter<BusinessType>();
  @Output() onDelete = new EventEmitter<void>();

  constructor(
    private businessTypeService: BusinessTypeService,
  ) {
  }

  startEdit(businessType: BusinessType) {
    this.startEditing.emit(businessType);
  }

  deleteBusinessType(id: number) {
    this.businessTypeService.delete(id).subscribe(() => {
      this.onDelete.emit();
    });
  }

  toggleExpand(id: number) {
    if (this.expandedBusinessTypeId === id) {
      this.expandedBusinessTypeId = null;
    } else {
      this.expandedBusinessTypeId = id;
      const businessType = this.businessTypes.find(bt => bt.id === id);
      if (businessType) {
        this.loadBusinessTypeImage(businessType);
      }
    }
  }

  loadBusinessTypeImage(businessType: BusinessType) {
    this.businessTypeService.getImage(businessType.id).subscribe(
      imageBlob => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          businessType.imageUrl = reader.result as string;
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
