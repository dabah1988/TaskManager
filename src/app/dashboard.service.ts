import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // rend ce service singleton global
})

export class DashboardService {


getTeamMembersSummary() 
{
    return  [
       { Region:"East",TeamMembersCount:5,UnavailableMembersCount:10},
        { Region:"West",TeamMembersCount:12,UnavailableMembersCount:5},
        { Region:"North",TeamMembersCount:7,UnavailableMembersCount:2},
        { Region:"South",TeamMembersCount:8,UnavailableMembersCount:4}
    ];
  }         
      
}
