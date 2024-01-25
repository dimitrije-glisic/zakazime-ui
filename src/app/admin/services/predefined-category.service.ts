import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PredefinedCategory} from "../../interfaces/predefined-category";
import {UpdatePredefinedCategoryRequest} from "../../interfaces/update-predefined-category-request";
import {CreatePredefinedCategoryRequest} from "../../interfaces/create-predefined-category-request";

@Injectable({
  providedIn: 'root'
})
export class PredefinedCategoryService {
  private apiPath = '/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<PredefinedCategory[]> {
    return this.http.get<PredefinedCategory[]>(this.apiPath);
  }

  getImage(id: number) {
    const imageUrl = `${this.apiPath}/${id}/image`;
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  create(createReq: CreatePredefinedCategoryRequest): Observable<PredefinedCategory> {
    return this.http.post<PredefinedCategory>(this.apiPath, createReq);
  }

  update(id: number, updateReq: UpdatePredefinedCategoryRequest): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, updateReq);
  }

  createWithImage(categoryWithImageData: FormData): Observable<PredefinedCategory> {
    return this.http.post<PredefinedCategory>(`${this.apiPath}/with-image`, categoryWithImageData);
  }

  updateWithImage(id: number, categoryWithImageData: FormData): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}/with-image`, categoryWithImageData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
