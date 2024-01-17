import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BusinessType} from "../../interfaces/business-type";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {
  private apiPath = '/api/business-types'; // Adjust as needed

  constructor(private http: HttpClient) { }

  getBusinessTypes(): Observable<BusinessType[]> {
    return this.http.get<BusinessType[]>(this.apiPath);
  }

  getBusinessTypeById(id: number): Observable<BusinessType> {
    return this.http.get<BusinessType>(`${this.apiPath}/${id}`);
  }

  createBusinessType(businessType: BusinessType): Observable<BusinessType> {
    return this.http.post<BusinessType>(this.apiPath, businessType);
  }

  updateBusinessType(id: number, businessType: BusinessType): Observable<any> {
    return this.http.put(`${this.apiPath}/${id}`, businessType);
  }

  deleteBusinessType(id: number): Observable<any> {
    // omit for now because of safety concerns
    return this.http.delete(`${this.apiPath}/${id}`);
    // return new Observable();
  }

}
