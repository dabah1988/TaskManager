import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';


export const routes: Routes = [
   {path: 'dashboard', component: DashboardComponent}, 
   {path: 'about', component: AboutComponent},
   {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
 
];
