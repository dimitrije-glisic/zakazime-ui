import {Component, Input} from '@angular/core';
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-business-profile-summary',
  templateUrl: './business-profile-summary.component.html',
  styleUrls: ['./business-profile-summary.component.css']
})
export class BusinessProfileSummaryComponent {

  @Input() business: Business | undefined;

}
