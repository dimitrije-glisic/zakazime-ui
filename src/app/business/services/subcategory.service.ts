import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {ServiceSubcategory} from "../../interfaces/service-subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  subcategories: ServiceSubcategory[] | undefined;

  constructor(private http: HttpClient) {
  }

  getAll() : Observable<ServiceSubcategory[]> {
    if (this.subcategories) {
      return of(this.subcategories); // Return cached value if available
    }
    console.log('contacting server for subcategories');
    return this.http.get<ServiceSubcategory[]>('/api/service-subcategory').pipe(
      tap(subcategories => {
          this.subcategories = subcategories
          console.log('got subcategories: ', subcategories);
        }
      ), // Cache the response
      catchError(err => {
        if (err.status === 404) {
          console.log('No subcategories found');
          throw new Error('No subcategories found');
        }
        return throwError(() => err);
      })
    );
  }
}
