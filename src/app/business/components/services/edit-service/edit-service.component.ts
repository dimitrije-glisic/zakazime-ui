import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service.interface';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
})
export class EditServiceComponent implements OnInit {
  service: Service | undefined;
  serviceForm: FormGroup;

  categories: string[] = ['Haircuts', 'Depilation', 'Nails', 'Makeup', 'Massage'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService // Assuming you have a service to handle API calls
  ) {
    this.serviceForm = new FormGroup({});
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id']; // Get the id from the route
      this.loadService(serviceId);
    });
  }

  loadService(name: string) {
    // Logic to load service by ID
    this.servicesService.getServiceByName(name).subscribe(service => {
      this.service = service;
      this.serviceForm = new FormGroup({
        'name': new FormControl(service.name),
        'note': new FormControl(service.note),
        'description': new FormControl(service.description),
        'price': new FormControl(service.price),
        'avgDuration': new FormControl(service.avgDuration),
        'category': new FormControl(service.categoryName),
      });

    });
  }

  onSave(service: Service): void {
    // Logic to save the edited service
    this.servicesService.updateService(service).subscribe(result => {
      this.router.navigate(['/manage-business/services']);
    });
  }
}
