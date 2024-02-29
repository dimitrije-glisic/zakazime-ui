import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Business} from "../../interfaces/business";
import {RejectBusinessRequest} from "../../interfaces/reject-business-request";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  path = '/api/admin';

  constructor(private http: HttpClient) {
  }

  getAllBusinessesWaitingForApproval() {
    return this.http.get<Business[]>(`${this.path}/businesses/waiting-for-approval`);
  }

  approveBusiness(id: number) {
    return this.http.post(`${this.path}/businesses/${id}/approve`, {});
  }

  rejectBusiness(id: number, rejectReason: any) {
    const rejectRequest: RejectBusinessRequest = {
      reason: rejectReason
    }
    return this.http.post(`${this.path}/businesses/${id}/reject`, rejectRequest);
  }
}
