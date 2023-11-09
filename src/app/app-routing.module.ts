import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowItWorksComponent } from './public-layout/how-it-works/how-it-works.component';
import { LoginComponent } from './registration-login/login/login.component';
import { PublicLayoutComponent } from './public-layout/public-layout/public-layout.component';
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from './admin/admin.component';
import { BusinessComponent } from './business/business.component';
import { RoleGuard } from './role.guard';


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
  { path: 'manage-business', component: BusinessComponent, canActivate: [RoleGuard], data: { expectedRole: 'SERVICE_PROVIDER' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
