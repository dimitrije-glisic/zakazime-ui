import {Component, Input} from '@angular/core';
import {Business} from "../../../../interfaces/business";

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.component.html',
  styleUrl: './businesses-list.component.css'
})
export class BusinessesListComponent {
  _businesses: Business[] = [];
  @Input() set businesses(businesses: Business[]) {
    this._businesses = businesses.filter(business => business.status !== 'CREATED');
  }
  currentPage = 1;
  itemsPerPage = 5;

}
