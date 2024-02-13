import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../../services/business-service';
import {Business} from "../../../interfaces/business";
import {BusinessType} from "../../../interfaces/business-type";
import {PredefinedCategory} from "../../../interfaces/predefined-category";
import {BusinessTypeService} from "../../../admin/services/business-type.service";
import {PredefinedCategoryService} from "../../../admin/services/predefined-category.service";
import {forkJoin, Observable, switchMap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  business: Business | undefined;
  businessTypes: BusinessType[] | undefined;
  allPredefinedCategories: PredefinedCategory[] | undefined;
  existingPredefinedCategories: PredefinedCategory[] | undefined;
  categories: PredefinedCategory[] | undefined;
  currentProfileImageUrl: string | undefined;

  constructor(private businessService: BusinessService, private businessTypeService: BusinessTypeService,
              private predefinedCategoryService: PredefinedCategoryService) {
  }

  ngOnInit(): void {
    this.loadSearchData();
  }

  private loadSearchData() {
    forkJoin(
      this.loadBusinessData(),
      this.loadPredefinedData()
    ).subscribe((results: [PredefinedCategory[], PredefinedData]) => {
      const [existing, predefinedData] = results;
      this.existingPredefinedCategories = existing;
      this.businessTypes = predefinedData.businessTypes;
      this.allPredefinedCategories = predefinedData.allPredefinedCategories;
      this.categories = this.difference(this.allPredefinedCategories, this.existingPredefinedCategories);
    });
  }

  private loadBusinessData(): Observable<PredefinedCategory[]> {
    return this.businessService.getBusinessCached().pipe(
      switchMap((business) => {
        if (!business) {
          return throwError(() => new Error('Business not found')); // Use throwError for better error handling
        }
        this.business = business;
        this.currentProfileImageUrl = business.profileImageUrl;
        return this.businessService.loadPredefinedCategories(business.id);
      }),
      catchError(
        err => {
          if (err.status === 404) {
            return throwError(() => new Error('Business not found')); // Use throwError for better error handling
          }
          return throwError(() => err);
        }
      ));
  }

  private loadPredefinedData(): Observable<PredefinedData> {
    return forkJoin({
      businessTypes: this.businessTypeService.getAll(),
      allPredefinedCategories: this.predefinedCategoryService.getAll()
    });
  }

  private difference(allPredefinedCategories: PredefinedCategory[], existingPredefinedCategories: PredefinedCategory[]) {
    return allPredefinedCategories.filter(predefined => {
      return !existingPredefinedCategories.some(existing => existing.id === predefined.id);
    });
  }

  saveSelectedCategories($event: PredefinedCategory[]) {
    this.businessService.savePredefinedCategories(this.business!.id, $event).subscribe(() => {
      this.businessService.loadPredefinedCategories(this.business!.id).subscribe(
        (predefinedCategories) => {
          this.existingPredefinedCategories = predefinedCategories;
          this.categories = this.difference(this.allPredefinedCategories!, this.existingPredefinedCategories);
        }
      );
    });
  }

  submitImage($event: File) {
    console.log('submitting image - business profile component');
    this.businessService.uploadProfileImage(this.business!.id, $event).subscribe(() => {
      this.businessService.loadBusiness().subscribe(business => {
        this.business = business;
        this.currentProfileImageUrl = business!.profileImageUrl;
        console.log('this.currentProfileImageUrl', this.currentProfileImageUrl);
      });
    });
  }
}

interface PredefinedData {
  businessTypes: BusinessType[];
  allPredefinedCategories: PredefinedCategory[];
}
