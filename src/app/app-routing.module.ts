import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './public-layout/how-it-works/how-it-works.component';
import { LoginComponent } from './registration-login/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout/public-layout.component';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from './admin/admin.component';
import { RoleGuard } from './role.guard';
import { BusinessDashboardComponent } from './business/business-dashboard/business-dashboard.component';
import { BusinessServicesComponent } from './business/services/business-services/business-services.component';
import { StatisticsComponent } from './business/statistics/statistics.component';
import { AddServiceFormComponent } from './business/services/add-service-form/add-service-form.component';
import { AddServiceFastFormComponent } from './business/services/add-service-fast-form/add-service-fast-form.component';
import { EditServiceComponent } from './business/services/edit-service/edit-service.component';


//   // Error route
//   { path: 'error', component: ErrorComponent },
// ];


const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'how-it-works', component: HowItWorksComponent },
      { path: 'login', component: LoginComponent }
    ]
  },

  { path: 'manage-users', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: 'ADMIN' } },
  // { path: 'manage-business', component: BusinessComponent, canActivate: [RoleGuard], data: { expectedRole: 'SERVICE_PROVIDER' } },

  {
    path: 'manage-business', component: BusinessDashboardComponent,
    children: [
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
