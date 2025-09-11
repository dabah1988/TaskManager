import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { NgbAccordionModule, NgbDropdownMenu, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbAccordionModule
  ],
  providers: [DashboardService],
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
Today:Date=new Date();

Clients:string[]=[];
Projects:string[]=['Project 1','Project 2','Project 3','Project 4','Project 5']; 
Years:number[]=[];
TeamMembersSummary:any=[];
TeamMembers:any=[];

constructor(private dashbosardService:DashboardService) { 

}

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
    this.Clients =['Abc Infotech Ltd','DEF Software solutio','Resaya Services','XCMG' ];
    this.Projects=['Application de gestion de tâches (To-Do App collaborative)'
      ,'Site e-commerce + API produits','Application de géolocalisation des talents',
      'Système de gestion de rendez-vous pour un cabinet médical' ];
      this.Years =[2025,2024,2023,2022,2021,2020,2019,2018];
      this.TeamMembersSummary = this.dashbosardService.getTeamMembersSummary();

      this.TeamMembers =[
         {
          Region:"East",Members:[
            {Id:1,Name:"Ford",Status:"Available"},
            {Id:2,Name:"Dabah",Status:"Busy"},
            {Id:3,Name:"Gnagne",Status:"Available"}
          ]
         },

         {
          Region:"West",Members:[
            {Id:1,Name:"Koumba",Status:"Available"},
            {Id:2,Name:"Erion",Status:"Busy"},
            {Id:3,Name:"Kanoo",Status:"Available"}
          ]
         },

         {
          Region:"North",Members:[
            {Id:1,Name:"Nathan",Status:"Available"},
            {Id:2,Name:"Eric",Status:"Busy"},
            {Id:3,Name:"Marc",Status:"Available"}
          ]
         },

         {
          Region:"South",Members:[
            {Id:1,Name:"Virginie",Status:"Available"},
            {Id:2,Name:"Ange",Status:"Busy"},
            {Id:3,Name:"Nathalie",Status:"Available"}
          ]
         }
      ]
  }

  onProjectChange($event:any){
    console.log($event.target.innerHTML);
  }
   onYearSelected(year: number) {
    console.log('Année sélectionnée:', year);
  }
}
