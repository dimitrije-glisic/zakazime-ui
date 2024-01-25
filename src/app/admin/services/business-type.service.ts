import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusinessType} from "../../interfaces/business-type";
import {MessageResponse} from "../../interfaces/message-response";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {
  private apiPath = '/api/business-types';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<BusinessType[]> {
    return this.http.get<BusinessType[]>(this.apiPath);
  }

  create(businessType: BusinessType): Observable<BusinessType> {
    return this.http.post<BusinessType>(this.apiPath, businessType);
  }

  createWithImage(businessWithImageData: FormData): Observable<BusinessType> {
    return this.http.post<BusinessType>(`${this.apiPath}/with-image`, businessWithImageData);
  }

  update(id: number, businessType: BusinessType): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, businessType);
  }

  updateWithImage(id: number, businessWithImageData: FormData): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiPath}/${id}/with-image`, businessWithImageData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`);
  }

  getImage(id: number): Observable<Blob> {
    // Replace the URL with the actual endpoint where images are served
    const imageUrl = `${this.apiPath}/${id}/image`;
    return this.http.get(imageUrl, {responseType: 'blob'});
  }
}
