import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {StatisticsComponent} from './business/components/statistics/statistics.component';
import {BusinessServicesComponent} from './business/components/services/business-services/business-services.component';
import {AddServiceFormComponent} from './business/components/services/add-service-form/add-service-form.component';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {FinishedRegistrationGuard} from './finished.registration.guard';
import {BusinessTypesComponent} from './public-layout/business-types/business-types-component-public.component';
import {CategoriesComponent} from './public-layout/categories/categories.component';
import {BusinessListingComponent} from './public-layout/business-listing/business-listing.component';
import {BusinessDetailsComponent} from './public-layout/business-details/business-details.component';
import {
  BookingSelectServicesComponent
} from './public-layout/booking/booking-select-services/booking-select-services.component';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {LoginComponent} from './registration-login/login/login.component';
import {HowItWorksComponent} from "./public-layout/how-it-works/how-it-works.component";
import {FinishRegistrationComponent} from "./registration-login/finish-registration/finish-registration.component";
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {
  BusinessTypeManagement
} from "./admin/components/business-types/business-type-management/business-type-management.component";
import {
  CategoryManagementComponent
} from "./admin/components/categories/category-management/category-management.component";

const routes: Routes = [
  {path: '', component: BusinessTypesComponent, data: {breadcrumb: 'pocetna'}},

  {path: 'how-it-works', component: HowItWorksComponent},

  {path: 'login', component: LoginComponent},

  {path: 'finish-registration', component: FinishRegistrationComponent},

  {
    path: 'business-type/:title',
    component: CategoriesComponent,
    data: {breadcrumb: 'title'}
  },

  {
    path: 'business-type/:title/:categoryTitle/:subCategoryTitle',
    component: BusinessListingComponent,
    data: {breadcrumb: 'subCategoryTitle'}
  },

  {path: 'business/:id', component: BusinessDetailsComponent},

  {path: 'booking/:business-name/select-services', component: BookingSelectServicesComponent},

  {path: 'booking/:business-name/pick-time', component: BookingDatePickerComponent},

  {path: 'booking/:business-name/confirm-booking', component: ConfirmBookingComponent},

  // { path: 'manage-business', component: BusinessComponent, canActivate: [RoleGuard], data: { expectedRole: 'SERVICE_PROVIDER' } },

  {
    path: 'manage-business', component: BusinessDashboardComponent, canActivate: [FinishedRegistrationGuard],
    children: [
      {path: 'profile', component: BusinessProfileComponent},

      {path: '', component: StatisticsComponent},
      {path: 'services', component: BusinessServicesComponent},
      {path: 'services/create', component: AddServiceFormComponent},
    ]
  },

  // {path: 'admin-dash', component: DashboardComponent, canActivate: [RoleGuard]},
  // {path: 'admin-dash', component: DashboardComponent},
  // {path: 'business-type-management', component: BusinessTypeListComponent},

  {
    path: 'admin', component: DashboardComponent,
    children: [
      {path: 'templates/business-types', component: BusinessTypeManagement},
      {path: 'templates/categories', component: CategoryManagementComponent},
    ]
  },


  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
