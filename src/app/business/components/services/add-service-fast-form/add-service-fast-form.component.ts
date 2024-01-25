import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicesService} from 'src/app/business/services/services.service';
import {BusinessService} from 'src/app/business/services/business-service';
import {Service} from "../../../../interfaces/service";
import {ServiceSubcategory} from "../../../../interfaces/service-subcategory";
import {Business} from "../../../../interfaces/business";
import {of, switchMap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-add-service-fast-form',
  templateUrl: './add-service-fast-form.component.html',
  styleUrls: ['./add-service-fast-form.component.css']
})
export class AddServiceFastFormComponent implements OnInit {
  // already existing services for this business
  existingServices: Service[] = [];

  subcategories: ServiceSubcategory[] = [];
  serviceTemplates: Service[] = [];
  selectedSubcategory: ServiceSubcategory | undefined;
  subcategoryServices: Service[] = [];
  userSelectedServices: Service[] = [];

  business: Business | undefined;

  constructor(private router: Router, private servicesService: ServicesService, private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.loadBusiness().pipe(
      switchMap(business => {
        if (!business) {
          return throwError(() => new Error('Business not found'));
        }
        this.business = business;
        return this.servicesService.getServiceTemplatesForBusinessType(business.typeId);
      }),
      switchMap(serviceTemplates => {
        this.serviceTemplates = serviceTemplates;
        return this.businessService.loadSubcategories(new Set(serviceTemplates.map(service => service.subcategoryId)));
      }),
      catchError(error => {
        console.error('Error occurred', error);
        return of([]); // handle the error as appropriate
      })
    ).subscribe(subcategories => {
      this.processSelectedSubcategory();
    });
  }

  private processSelectedSubcategory(): void {
    this.selectedSubcategory = this.subcategories[0];
    this.loadSubcategoryServices(this.selectedSubcategory!.id);
  }

  private loadSubcategoryServices(subcategoryId: number): void {
    this.businessService.loadServices(this.business!.id).subscribe(
      (services: Service[]) => {
        this.existingServices = services;
        this.subcategoryServices = this.serviceTemplates.filter(service => service.subcategoryId === subcategoryId && !services.find(s => s.title === service.title));
      },
      (error: any) => {
        console.error('Error fetching services:', error);
      }
    );
  }

  onSubcategorySelect(event: Event): void {
    const selectElement = event.target;
    if (selectElement instanceof HTMLSelectElement) {
      this.selectedSubcategory = this.subcategories.find(subcategory => subcategory.id === Number(selectElement.value));
      this.subcategoryServices = this.serviceTemplates.filter(service => service.subcategoryId === this.selectedSubcategory?.id && !this.existingServices.find(s => s.title === service.title));
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
