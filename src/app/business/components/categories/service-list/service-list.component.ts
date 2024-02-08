import {Component, Input} from '@angular/core';
import {Service} from "../../../../interfaces/service";
import {UserDefinedCategory} from "../../../../interfaces/user-defined-category";
import {BusinessService} from "../../../services/business-service";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {

  _category: UserDefinedCategory | null = null;
  _services: Service[] | undefined;

  @Input() set category(category: UserDefinedCategory | null) {
    this._category = category;
    if (category) {
      console.log(`Loading services for category ${category.title}...`);
      this.loadServices();
    }
  }

  constructor(private businessService: BusinessService) {
  }

  private loadServices() {
    this.businessService.loadServices().subscribe(services =>
      this._services = services.filter(service => service.categoryId === this._category!.id));
  }
}
