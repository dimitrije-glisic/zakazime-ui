import {Component, Input} from '@angular/core';
import {Business} from "../../interfaces/business";

@Component({
  selector: 'app-business-profile-summary',
  templateUrl: './business-profile-summary.component.html',
  styleUrls: ['./business-profile-summary.component.css']
})
export class BusinessProfileSummaryComponent {

  @Input() business: Business | undefined;

  getRating() {
    return (Math.random() * 3 + 7).toFixed(1);
  }

  getRatingCount() {
    return Math.floor(Math.random() * 100);
  }

  getLastAppointmentBookTime() {
    const option1 = "pre 2 sata";
    const option2 = "pre 1 sat";
    const option3 = "pre 30 minuta";

    //return random option
    const options = [option1, option2, option3];
    return options[Math.floor(Math.random() * options.length)];
  }

  getLastWorkingHour() {
    return "20:00";
  }

  getFirstWorkingHourForTomorrow() {
    return "08:00";
  }

  getLastWorkingHourForTomorrow() {
    return "20:00";
  }
}
