import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, first, map, Observable, of} from "rxjs";
import {BusinessType} from "../../interfaces/business-type";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  businessTypes: BusinessType[] = [];

  constructor(private http: HttpClient) {
  }

  findBusinessTypeById(id: number): Observable<BusinessType> {
    if (this.businessTypes.length > 0) {
      const found = this.businessTypes.find(businessType => businessType.id === id);
      if (found) {
        return of(found);
      }
    }
    return this.http.get<BusinessType[]>('/api/business-types').pipe(
      tap(businessTypes => this.businessTypes = businessTypes),
      map(businessTypes => {
        const found = businessTypes.find(businessType => businessType.id === id);
        if (!found) {
          throw new Error('Business type not found');
        }
        return found;
      }),
      catchError(() => {
        throw new Error('Business type not found');
      })
    );
  }


}
