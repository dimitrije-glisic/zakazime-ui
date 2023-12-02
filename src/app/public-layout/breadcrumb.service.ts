import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Params } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, filter, map } from 'rxjs';

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
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(() => this.findLeafRoute(this.activatedRoute)),
      map(leafRoute => this.createBreadcrumbs(leafRoute))
    ).subscribe(breadcrumbs => {
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
    const routePath = this.getCurrentRoute(route);
    return routePath.split('/')
      .filter(part => part)
      .map(part => part.split(':')[1])
      .reduce((acc, part, index, array) => {
        const label = this.getLabelFromParams(part, route.snapshot.params);
        acc.url += `${label}/`;
        acc.breadcrumbs.push({
          label: label.charAt(0).toUpperCase() + label.slice(1),
          url: acc.url
        } as Breadcrumb); // Add type assertion here
        return acc;
      }, { breadcrumbs: [] as Breadcrumb[], url: '' }).breadcrumbs;
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
