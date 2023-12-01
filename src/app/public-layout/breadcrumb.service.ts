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
    ).subscribe(() => {
      const rootRoute = this.activatedRoute.root;
      const breadcrumbs = this.createBreadcrumbs(rootRoute);
      this.breadcrumbsSource.next(breadcrumbs);
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const newBreadcrumbs = [...breadcrumbs];

    if (route.routeConfig && route.snapshot.url.length) {
      const path = route.snapshot.url.map(segment => segment.path).join('/');
      url = `${url}/${path}`;

      let label = route.routeConfig.data?.['breadcrumb'] || 'Home';
      if (label.includes(':')) {
        label = this.getLabelFromParams(label, route.snapshot.params);
      }

      newBreadcrumbs.push({ label, url });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

  private getLabelFromParams(label: string, params: Params): string {
    return label.split(':').map(part => {
      return params[part] || part;
    }).join(' ');
  }
}
