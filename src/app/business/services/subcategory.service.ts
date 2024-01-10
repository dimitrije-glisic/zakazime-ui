import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, of, tap, throwError} from "rxjs";
import {ServiceSubcategory} from "../../interfaces/service-subcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  subcategories: ServiceSubcategory[] = [];

  constructor(private http: HttpClient) {
  }

  getAll() {
    if (this.subcategories) {
      return of(this.subcategories); // Return cached value if available
    }
    console.log('contacting server for subcategories');
    return this.http.get<ServiceSubcategory[]>('/api/service-subcategory').pipe(
      tap(subcategories => this.subcategories = subcategories), // Cache the response
      catchError(err => {
        if (err.status === 404) {
          return of(null);
        }
        return throwError(() => err);
      })
    );
  }
}
