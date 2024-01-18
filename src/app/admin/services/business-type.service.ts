import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusinessType} from "../../interfaces/business-type";
import {ImageUploadResponse} from "../../interfaces/image-upload-response";
import {MessageResponse} from "../../interfaces/message-response";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {
  private apiPath = '/api/business-types'; // Adjust as needed

  constructor(private http: HttpClient) {
  }

  getBusinessTypes(): Observable<BusinessType[]> {
    return this.http.get<BusinessType[]>(this.apiPath);
  }

  getBusinessTypeById(id: number): Observable<BusinessType> {
    return this.http.get<BusinessType>(`${this.apiPath}/${id}`);
  }

  createBusinessType(businessType: BusinessType): Observable<BusinessType> {
    return this.http.post<BusinessType>(this.apiPath, businessType);
  }

  createBusinessTypeWithImage(businessWithImageData: FormData): Observable<BusinessType> {
    return this.http.post<BusinessType>(`${this.apiPath}/with-image`, businessWithImageData);
  }

  updateBusinessType(id: number, businessType: BusinessType): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, businessType);
  }

  updateBusinessTypeWithImage(id: number, businessWithImageData: FormData): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiPath}/${id}/with-image`, businessWithImageData);
  }

  deleteBusinessType(id: number): Observable<any> {
    // omit for now because of safety concerns
    return this.http.delete(`${this.apiPath}/${id}`);
    // return new Observable();
  }

  uploadImage(id: number, imageData: FormData): Observable<ImageUploadResponse> {
    return this.http.post<ImageUploadResponse>(`${this.apiPath}/${id}/upload-image`, imageData);
  }

  getBusinessTypeImageUrl(id: number): Observable<string> {
    // Replace the URL with the actual endpoint where images are served
    const imageUrl = `${this.apiPath}/${id}/image-url`;
    return this.http.get(imageUrl, {responseType: 'text'});
  }

  getBusinessTypeImage(id: number): Observable<Blob> {
    // Replace the URL with the actual endpoint where images are served
    const imageUrl = `${this.apiPath}/${id}/image`;
    return this.http.get(imageUrl, {responseType: 'blob'});
  }
}
