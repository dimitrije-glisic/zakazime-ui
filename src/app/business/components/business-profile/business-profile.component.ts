import {Component} from '@angular/core';
import {BusinessService} from '../../services/business-service';
import {Business} from "../../../interfaces/business";
import {BusinessType} from "../../../interfaces/business-type";
import {PredefinedCategory} from "../../../interfaces/predefined-category";
import {BusinessTypeService} from "../../../admin/services/business-type.service";
import {PredefinedCategoryService} from "../../../admin/services/predefined-category.service";
import {forkJoin, Observable, switchMap, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent {


  business: Business | undefined;
  businessTypes: BusinessType[] | undefined;
  allPredefinedCategories: PredefinedCategory[] | undefined;
  existingPredefinedCategories: PredefinedCategory[] | undefined;
  categories: PredefinedCategory[] | undefined;

  constructor(private businessService: BusinessService, private businessTypeService: BusinessTypeService,
              private predefinedCategoryService: PredefinedCategoryService) {
  }

  // ngOnInit(): void {
  //   this.businessService.loadBusiness().subscribe(business => {
  //     if (business) {
  //       this.business = business;
  //       this.businessService.loadPredefinedCategories(business.id).subscribe(predefinedCategories => {
  //         this.existingPredefinedCategories = predefinedCategories;
  //       });
  //       forkJoin({
  //         businessTypes: this.businessTypeService.getAll(),
  //         predefinedCategories: this.predefinedCategoryService.getAll()
  //       }).subscribe(({businessTypes, predefinedCategories}) => {
  //         this.businessTypes = businessTypes;
  //         this.allPredefinedCategories = predefinedCategories;
  //       });
  //     } else {
  //       throw new Error('Business not found');
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.loadSearchData();
  }

  private loadSearchData() {
    // this.loadBusinessData();
    // this.loadPredefinedData();
    forkJoin(
      this.loadBusinessData(),
      this.loadPredefinedData()
    ).subscribe((results: [PredefinedCategory[], PredefinedData]) => {
      const [existing, predefinedData] = results;
      this.existingPredefinedCategories = existing;
      this.businessTypes = predefinedData.businessTypes;
      this.allPredefinedCategories = predefinedData.allPredefinedCategories;
      this.categories = this.difference(this.allPredefinedCategories, this.existingPredefinedCategories);
      console.log('this.existing in business profile load', this.existingPredefinedCategories);
    });
  }

  private loadBusinessData(): Observable<PredefinedCategory[]> {
    return this.businessService.loadBusiness().pipe(
      switchMap((business) => {
        if (!business) {
          return throwError(() => new Error('Business not found')); // Use throwError for better error handling
        }
        this.business = business;

        return this.businessService.loadPredefinedCategories(business.id).pipe(
          tap((predefinedCategories) => {
            console.log('this.existing in business profile load', predefinedCategories);
          })
        );

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

  // private loadSearchData() {
  //   this.businessService.loadBusiness().pipe(
  //     switchMap((business) => {
  //       if (!business) {
  //         return throwError(() => new Error('Business not found')); // Use throwError for better error handling
  //       }
  //       this.business = business;
  //
  //       return this.combineDataForBusiness(business.id); // Refactored for readability
  //     }),
  //     catchError(this.handleError) // Modularized error handling
  //   ).subscribe(this.handleSuccess, this.handleError);
  // }
  //
  // private combineDataForBusiness(businessId: number): Observable<CombinedData> {
  //   return forkJoin({
  //     existingPredefinedCategories: this.businessService.loadPredefinedCategories(businessId),
  //     combinedData: forkJoin({
  //       businessTypes: this.businessTypeService.getAll(),
  //       allPredefinedCategories: this.predefinedCategoryService.getAll()
  //     })
  //   });
  // }
  //
  // private handleSuccess(data: CombinedData) {
  //   this.existingPredefinedCategories = data.existingPredefinedCategories;
  //   this.businessTypes = data.combinedData.businessTypes;
  //   this.allPredefinedCategories = data.combinedData.allPredefinedCategories;
  //   this.categories = this.difference(this.allPredefinedCategories, this.existingPredefinedCategories);
  // }
  //
  // private handleError(error: any): Observable<never> {
  //   console.error(error);
  //   // Consider more user-friendly error handling or UI notification
  //   return throwError(() => new Error('An error occurred, please try again later.'));
  // }
  //

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

}

interface CombinedData {
  businessData: PredefinedCategory[];
  predefinedData: PredefinedData;
}

interface PredefinedData {
  businessTypes: BusinessType[];
  allPredefinedCategories: PredefinedCategory[];
}
