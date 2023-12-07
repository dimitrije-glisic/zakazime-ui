import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { BusinessDashboardComponent } from './business/components/business-dashboard/business-dashboard.component';
import { StatisticsComponent } from './business/components/statistics/statistics.component';
import { BusinessServicesComponent } from './business/components/services/business-services/business-services.component';
import { AddServiceFormComponent } from './business/components/services/add-service-form/add-service-form.component';
import { AddServiceFastFormComponent } from './business/components/services/add-service-fast-form/add-service-fast-form.component';
import { EditServiceComponent } from './business/components/services/edit-service/edit-service.component';
import { BusinessProfileComponent } from './business/components/business-profile/business-profile.component';
import { FinishedRegistrationGuard } from './finished.registration.guard';
import { BusinessTypesComponent } from './public-layout/business-types/business-types.component';
import { CategoriesComponent } from './public-layout/categories/categories.component';
import { SubCategoriesComponent } from './public-layout/sub-categories/sub-categories.component';
import { BusinessListingComponent } from './public-layout/business-listing/business-listing.component';
import { BusinessDetailsComponent } from './public-layout/business-details/business-details.component';
import { BookingComponent } from './public-layout/booking/booking.component';

const routes: Routes = [
  { path: '', component: BusinessTypesComponent, data: { breadcrumb: 'pocetna' } },

  {
    path: 'business-type/:title', 
    component: CategoriesComponent, 
    data: { breadcrumb: 'title' }
  },
  {
    path: 'business-type/:title/:categoryTitle', 
    component: SubCategoriesComponent, 
    data: { breadcrumb: 'categoryTitle' }
  },

  {
    path: 'business-type/:title/:categoryTitle/:subCategoryTitle', 
    component: BusinessListingComponent, 
    data: { breadcrumb: 'subCategoryTitle' }
  },

  { path: 'business/:id', component: BusinessDetailsComponent },

  { path: 'booking/:business-name', component: BookingComponent },

  { path: 'manage-users', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
  // { path: 'manage-business', component: BusinessComponent, canActivate: [RoleGuard], data: { expectedRole: 'SERVICE_PROVIDER' } },

  {
    path: 'manage-business', component: BusinessDashboardComponent, canActivate: [FinishedRegistrationGuard],
    children: [
      { path: 'profile', component: BusinessProfileComponent },

      { path: '', component: StatisticsComponent },
      { path: 'services', component: BusinessServicesComponent },
      { path: 'services/create', component: AddServiceFormComponent },
      { path: 'services/create-fast', component: AddServiceFastFormComponent },
      { path: 'services/edit/:id', component: EditServiceComponent },
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
