import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CustomerRichObject} from "../../../../interfaces/customer-rich-object";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnChanges {

  confirmedCnt: number = 0;
  canceledCnt: number = 0;
  noShowCnt: number = 0;

  selectedTab: string = 'appointments';

  @Input() customer: CustomerRichObject | undefined;

  ngOnChanges(): void {
    this.confirmedCnt = this.getConfirmed();
    this.canceledCnt = this.getCanceled();
    this.noShowCnt = this.getNoShow();
  }

  private getConfirmed() {
    return this.customer?.appointments.filter((a) => a.appointment.status === 'CONFIRMED').length || 0;
  }

  private getCanceled() {
    return this.customer?.appointments.filter((a) => a.appointment.status === 'CANCELLED').length || 0;
  }

  private getNoShow() {
    return this.customer?.appointments.filter((a) => a.appointment.status === 'NO_SHOW').length || 0;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'CONFIRMED':
        return 'green';
      case 'SCHEDULED':
        return 'blue';
      default:
        return 'RED';
    }
  }
}
