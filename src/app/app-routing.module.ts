import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './public-layout/how-it-works/how-it-works.component';
import { LoginComponent } from './registration-login/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout/public-layout.component';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { BusinessDashboardComponent } from './business/components/business-dashboard/business-dashboard.component';
import { StatisticsComponent } from './business/components/statistics/statistics.component';
import { BusinessServicesComponent } from './business/components/services/business-services/business-services.component';
import { AddServiceFormComponent } from './business/components/services/add-service-form/add-service-form.component';
import { AddServiceFastFormComponent } from './business/components/services/add-service-fast-form/add-service-fast-form.component';
import { EditServiceComponent } from './business/components/services/edit-service/edit-service.component';
import { BusinessProfileComponent } from './business/components/business-profile/business-profile.component';
import { FinishRegistrationComponent } from './registration-login/finish-registration/finish-registration.component';
import { FinishedRegistrationGuard } from './finished.registration.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'how-it-works', component: HowItWorksComponent },
      { path: 'login', component: LoginComponent },
      // add is logged in guard for finish registration
      { path: 'finish-registration', component: FinishRegistrationComponent },
    ]
  },

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
