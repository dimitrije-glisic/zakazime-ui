import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StartTime} from "../../../interfaces/start-time";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  public basePath = '/api/time-slots';

  constructor(private http: HttpClient) {
  }

  public getAvailableTimeSlots(businessId: number, serviceId: number, date: Date, employeeId: number | undefined): Observable<StartTime[]> {
    // return this.http.get<StartTime[]>(`${this.basePath}/${businessId}/${serviceId}/available?date=${date}&employeeId=5`);
    const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');

    const requestUrl = `${this.basePath}/${businessId}/${serviceId}/available?date=${dateStr}`;
    if (employeeId) {
      return this.http.get<StartTime[]>(`${requestUrl}&employeeId=${employeeId}`);
    } else {
      return this.http.get<StartTime[]>(requestUrl);
    }
  }

}
