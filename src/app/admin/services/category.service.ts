import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceCategory} from "../../interfaces/service-category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath = '/api/service-category';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(this.apiPath);
  }

  getImage(id: number) {
    const imageUrl = `${this.apiPath}/${id}/image`;
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  create(category: ServiceCategory): Observable<ServiceCategory> {
    return this.http.post<ServiceCategory>(this.apiPath, category);
  }

  update(id: number, category: ServiceCategory): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, category);
  }

  createWithImage(categoryWithImageData: FormData): Observable<ServiceCategory> {
    return this.http.post<ServiceCategory>(`${this.apiPath}/with-image`, categoryWithImageData);
  }

  updateWithImage(id: number, categoryWithImageData: FormData): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}/with-image`, categoryWithImageData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiPath}/${id}`);
  }
}
