import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {
Designation:string='';
Username:string=''; 
NoOfTeamMembers:number=0;
TotalCostOfAllProjects:number=0;
PendingTasks:number=0;  
UpComingProjects:number=0;
ProjectCost:number=0;
CurrentExpenditure:number=0;  
AvailableFunds:number=0;  

Clients:string[]=['Client 1','Client 2','Client 3','Client 4','Client 5'];
Projets:string[]=['Project 1','Project 2','Project 3','Project 4','Project 5']; 
Years:number[]=[];
TeamMembersSummary:[]=[];
TeamMembers:[]=[];

  ngOnInit() {
    this.Designation='Team Leader';
    this.Username='John Doe';
    this.NoOfTeamMembers=5;
    this.TotalCostOfAllProjects=100000;
    this.PendingTasks=3;
    this.UpComingProjects=2;
    this.ProjectCost=5000;
    this.CurrentExpenditure=20300;
    this.AvailableFunds=50000;
  }
}
