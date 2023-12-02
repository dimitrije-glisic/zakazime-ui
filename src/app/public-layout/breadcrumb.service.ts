import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Params } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSource = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs = this.breadcrumbsSource.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const leaf = this.findLeafRoute(this.activatedRoute);
      const breadcrumbs = this.createBreadcrumbs(leaf);
      breadcrumbs.unshift({ label: 'Pocetna', url: '' });
      console.log(breadcrumbs);
      this.breadcrumbsSource.next(breadcrumbs);
    });
  }

  private findLeafRoute(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild) {
      return this.findLeafRoute(route.firstChild);
    }
    return route;
  }

  private createBreadcrumbs(route: ActivatedRoute): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    const path = this.getCurrentRoute(route);
    let url = '';
    path.split('/')
      .filter(part => part)
      .forEach((part, index, parts) => {
        part = part.replace(':', '');
        const label = this.getLabelFromParams(part, route.snapshot.params);
        url += `${label}/`;
        const breadcrumb = {
          label: label.charAt(0).toUpperCase() + label.slice(1),
          url: url
        };
        breadcrumbs.push(breadcrumb);
      });
    return breadcrumbs;
  }

  private getCurrentRoute(route: ActivatedRoute): string {
    return route.snapshot.pathFromRoot
      .map(r => r.routeConfig && r.routeConfig.path)
      .filter(path => path)
      .join('/');
  }

  private getLabelFromParams(label: string, params: Params): string {
    return label.split('/').map(part => {
      return params[part] || part;
    }).join(' ');
  }
}
