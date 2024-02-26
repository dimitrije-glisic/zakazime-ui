import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BusinessDashboardComponent} from './business/components/business-dashboard/business-dashboard.component';
import {StatisticsComponent} from './business/components/statistics/statistics.component';
import {ServiceManagementComponent} from './business/components/service-management/service-management.component';
import {BusinessProfileComponent} from './business/components/business-profile/business-profile.component';
import {FinishedRegistrationGuard} from './finished.registration.guard';
import {
  BookingSelectServicesComponent
} from './public-layout/booking/booking-select-services/booking-select-services.component';
import {BookingDatePickerComponent} from './public-layout/booking/booking-date-picker/booking-date-picker.component';
import {ConfirmBookingComponent} from './public-layout/booking/confirm-booking/confirm-booking.component';
import {DashboardComponent} from "./admin/components/dashboard/dashboard.component";
import {
  BusinessTypeManagement
} from "./admin/components/business-types/business-type-management/business-type-management.component";
import {
  CategoryManagementComponent
} from "./admin/components/categories/category-management/category-management.component";

import {DiscoverComponent} from "./public-layout/discover/discover.component";
import {HowItWorksComponent} from "./public-layout/legacy/how-it-works/how-it-works.component";
import {LoginComponent} from "./registration-login/login/login.component";
import {FinishRegistrationComponent} from "./registration-login/finish-registration/finish-registration.component";
import {BusinessesOverviewComponent} from "./public-layout/businesses-overview/businesses-overview.component";
import {BusinessMainPageComponent} from "./public-layout/business-main-page/business-main-page.component";
import {RegistrationComponent} from "./registration-login/registration/registration.component";
import {ProfileComponent} from "./registration-login/profile/profile.component";
import {BusinessesManagementComponent} from "./admin/components/businesses/businesses-management/businesses-management.component";

const routes: Routes = [
  {path: 'booking/:business-name/select-services', component: BookingSelectServicesComponent},

  {path: 'booking/:business-name/pick-time', component: BookingDatePickerComponent},

  {path: 'booking/:business-name/confirm-booking', component: ConfirmBookingComponent},

  {
    path: 'manage-business', component: BusinessDashboardComponent, canActivate: [FinishedRegistrationGuard],
    children: [
      {path: 'profile', component: BusinessProfileComponent},

      {path: '', component: StatisticsComponent},
      {path: 'services', component: ServiceManagementComponent},
    ]
  },

  {
    path: 'admin', component: DashboardComponent,
    children: [
      {path: 'templates/business-types', component: BusinessTypeManagement},
      {path: 'templates/categories', component: CategoryManagementComponent},
      {path: 'businesses', component: BusinessesManagementComponent},
    ]
  },

  {path: '', component: DiscoverComponent},

  {path: 'how-it-works', component: HowItWorksComponent},

  {path: 'login', component: LoginComponent},

  {path: 'me/register', component: RegistrationComponent},

  {path: 'me', component: ProfileComponent},

  {path: 'finish-registration', component: FinishRegistrationComponent},

  //================================================================================================

  {path: 'discover/:city/svi-saloni', component: BusinessesOverviewComponent},

  {path: 'discover/:city/:business-type', component: BusinessesOverviewComponent},

  {path: 'discover/:city/:business-type/:category', component: BusinessesOverviewComponent},

  {path: 'business/:city/:business-name', component: BusinessMainPageComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
