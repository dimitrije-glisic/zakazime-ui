import { Component } from '@angular/core';
import { Breadcrumb, BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
