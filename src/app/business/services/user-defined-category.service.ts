import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UpdatePredefinedCategoryRequest} from "../../interfaces/update-predefined-category-request";
import {UserDefinedCategory} from "../../interfaces/user-defined-category";
import {CreateUserDefinedCategoryRequest} from "../../interfaces/create-user-defined-category-request";

@Injectable({
  providedIn: 'root'
})
export class UserDefinedCategoryService {
  private apiPath = '/api/business/';

  constructor(private http: HttpClient) {
  }

  getAll(businessId: number): Observable<UserDefinedCategory[]> {
    return this.http.get<UserDefinedCategory[]>(`${this.apiPath}/${businessId}/categories`);
  }

  create(businessId:number, createReq: CreateUserDefinedCategoryRequest): Observable<UserDefinedCategory> {
    return this.http.post<UserDefinedCategory>(`${this.apiPath}/${businessId}/categories`, createReq);
  }

  update(businessId: number, categoryId: number, updateReq: UpdatePredefinedCategoryRequest): Observable<any> {
    return this.http.put(`${this.apiPath}/${businessId}/categories/${categoryId}`, updateReq);
  }

  // delete(businessId: number, categoryId: number) {
  //   return this.http.delete(`${this.apiPath}/${businessId}/categories/${categoryId}`);
  // }

}
