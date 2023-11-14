import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { Service } from 'src/app/interfaces/service.interface';

@Component({
  selector: 'app-add-service-fast-form',
  templateUrl: './add-service-fast-form.component.html',
  styleUrls: ['./add-service-fast-form.component.css']
})
export class AddServiceFastFormComponent implements OnInit {
  categories: string[] = ['Haircuts', 'Depilation', 'Nails', 'Makeup', 'Massage'];
  predefinedServices: Service[] = [];
  selectedCategory: string | null = null;
  categoryServices: Service[] = [];
  userSelectedServices: Service[] = [];

  constructor(private http: HttpClient, private servicesService: ServicesService,
    private router: Router) {
  }

  ngOnInit(): void {
    //read categories from file ./predefined-services.json
    // this.http.get<Service[]>('assets/predefined-services.json').subscribe(data => {
    this.servicesService.loadMockServices().subscribe(data => {
      this.predefinedServices = data;
      this.selectedCategory = this.categories[0];
      this.categoryServices = this.predefinedServices
        .filter(service => service.category === this.selectedCategory);
    });
  }

  onCategorySelect(event: Event): void {
    const selectElement = event.target;
    if (selectElement instanceof HTMLSelectElement) {
      this.selectedCategory = selectElement.value;
      this.categoryServices = this.predefinedServices.filter(service => service.category === this.selectedCategory);
      this.userSelectedServices = [];
    }
  }

  onServiceSelect(service: Service): void {
    if (!this.userSelectedServices.includes(service)) {
      this.userSelectedServices.push(service);
    }
  }

  onSaveServices(): void {
    this.servicesService.createServices(this.userSelectedServices).subscribe(response => {
      console.log('Services created');
      this.router.navigate(['manage-business', 'services']);
    });
  }

}
