import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesService} from 'src/app/business/services/services.service';
import {BusinessService} from 'src/app/business/services/business-service';
import {Service} from "../../../../interfaces/service";
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";
import {SubcategoryService} from "../../../services/subcategory.service";
import {Business} from "../../../../interfaces/business";

@Component({
  selector: 'app-add-service-fast-form',
  templateUrl: './add-service-fast-form.component.html',
  styleUrls: ['./add-service-fast-form.component.css']
})
export class AddServiceFastFormComponent implements OnInit {
  // what is this????
  existingServices: Service[] = [];

  subcategories: ServiceSubcategory[] = [];
  serviceTemplates: Service[] = [];
  selectedSubcategory: ServiceSubcategory | undefined;
  subcategoryServices: Service[] = [];
  userSelectedServices: Service[] = [];

  business: Business | undefined;

  constructor(private router: Router, private servicesService: ServicesService, private businessService: BusinessService,
              private subcategoryService: SubcategoryService) {
  }

  ngOnInit(): void {
    const businessType = this.businessService.getBusiness().subscribe(
      business => {
        if (!business) {
          throw new Error('Business not found');
        }
        this.business = business;
        this.loadTemplates(business.typeId);
      }
    )
  }

  loadTemplates(businessTypeId: number): void {
    this.servicesService.getServiceTemplatesForBusinessType(businessTypeId).subscribe(serviceTemplates => {
      this.subcategoryService.getAll().subscribe(subcategories => {
        this.serviceTemplates = serviceTemplates;
        const subcategoryIds = [...new Set(serviceTemplates.map(service => service.subcategoryId))];
        console.log(subcategoryIds);
        this.subcategories = subcategories.filter(subcategory => subcategoryIds.includes(subcategory.id));
        console.log(this.subcategories);
        this.selectedSubcategory = this.subcategories[0];
        this.subcategoryServices = this.serviceTemplates.filter(service => service.subcategoryId === this.selectedSubcategory?.id)
      });
    });
  }

  onSubcategorySelect(event: Event): void {
    const selectElement = event.target;
    if (selectElement instanceof HTMLSelectElement) {
      this.selectedSubcategory = this.subcategories.find(subcategory => subcategory.id === Number(selectElement.value));
      this.subcategoryServices = this.serviceTemplates.filter(service => service.subcategoryId === this.selectedSubcategory?.id);
      this.userSelectedServices = [];
    }
  }

  onServiceSelect(service: Service): void {
    if (!this.userSelectedServices.includes(service)) {
      this.userSelectedServices.push(service);
    }
  }

  onSaveServices(): void {
    this.servicesService.createServices(this.userSelectedServices, this.business!.id).subscribe(response => {
      console.log('Services created');
      this.businessService.addServicesLocally(this.userSelectedServices);
      this.router.navigate(['manage-business', 'services']);
    });
  }

}
