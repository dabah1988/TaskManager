
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectAddRequest } from '../models/project-add-request';
import { ProjectResponse } from '../models/project-response';
import { environment } from '../environment';
import { map } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class ManageProjectServiceService {

 
  constructor(private httpClient:HttpClient, public accountService:AccountService) { }
  getProjects(pageNumber: number = 2, pageSize: number = 10):Observable<ProjectResponse[]>
  {
       const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
     return this.httpClient.get<ProjectResponse[]>(environment.taskManagerMicroserviceUrl,{params,headers:this.accountService.getAuthHeaders()})
     .pipe(
      map(
         (data:Project[]) =>
         {
            for(let i=0; i<data.length;i++)
            {
               data[i].teamSize = data[i].teamSize*100;
            }
                 return data;
         }

      )
    
    )
     ;  
  }

  insertProject(newProject:ProjectAddRequest):Observable<ProjectResponse>
  {    
    return this.httpClient.post<ProjectResponse>(environment.taskManagerMicroserviceUrl, newProject,{headers:this.accountService.getAuthHeaders()});
  }

    updateProject(existingProject:Project):Observable<Project>
  {    
    return this.httpClient.put<Project>(`${environment.taskManagerMicroserviceUrl}${existingProject.projectId}`, 
      existingProject,{headers: this.accountService.getAuthHeaders()} );
  }

    deleteProject(existingProject:Project):Observable<boolean>
  {    
    return this.httpClient.delete<boolean>(`${environment.taskManagerMicroserviceUrl}${existingProject.projectId}`,{headers:this.accountService.getAuthHeaders()} );
  }

  
    searchProject(searchBy:string,searchText:string,pageNumber: number = 2, pageSize: number = 10):Observable<ProjectResponse[]>
  {    
       const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
       .set('searchBy',searchBy)
       .set('searchText',searchText);
    return this.httpClient.get<ProjectResponse[]>(`${environment.taskManagerMicroserviceUrl}search`,{params,headers:this.accountService.getAuthHeaders()} );
  }
}
