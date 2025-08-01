import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { DashboardService } from '../dashboard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent,
    MyProfileComponent,
    AboutComponent
  ],
  exports:[DashboardComponent,MyProfileComponent,AboutComponent], 
  providers: [DashboardService]
})
export class AdminModule { 


}
