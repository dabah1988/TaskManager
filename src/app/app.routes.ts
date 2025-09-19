import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './admin/about/about.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [
   {path: 'dashboard', component: DashboardComponent}, 
   {path: 'about', component: AboutComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'register', component: RegisterComponent},    
    {path: 'login', component: LoginComponent},
   {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
 
];
