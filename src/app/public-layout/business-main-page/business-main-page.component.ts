import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BusinessService} from "../../business/services/business-service";
import {BusinessRichObject} from "../../interfaces/business-rich-object";

@Component({
  selector: 'app-business-main-page',
  templateUrl: './business-main-page.component.html',
  styleUrl: './business-main-page.component.css'
})
export class BusinessMainPageComponent {

  city: string | undefined;
  businessName: string | undefined;
  businessRichObj: BusinessRichObject | undefined;

  selectedTab: string = 'usluge';

  constructor(private activatedRoute: ActivatedRoute, private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const {city, 'business-name': businessName} = params;
      this.city = city;
      this.businessName = businessName;
      this.loadBusinessData(city, businessName);
    });
  }

  loadBusinessData(city: string, businessName: string): void {
    this.businessService.loadRichBusinessObject(city, businessName).subscribe(business => {
      this.businessRichObj = business;
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
