
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectAddRequest } from '../models/project-add-request';
import { ProjectResponse } from '../models/project-response';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class ManageProjectServiceService {

  constructor(private httpClient:HttpClient) { }
  getProjects(pageNumber: number = 2, pageSize: number = 10):Observable<Project[]>
  {
       const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
     return this.httpClient.get<ProjectResponse[]>(environment.taskManagerMicroserviceUrl,{params});  
  }

  insertProject(newProject:ProjectAddRequest):Observable<ProjectResponse>
  {    
    return this.httpClient.post<ProjectResponse>(environment.taskManagerMicroserviceUrl, newProject );
  }

    updateProject(existingProject:Project):Observable<Project>
  {    
    return this.httpClient.put<Project>(`${environment.taskManagerMicroserviceUrl}${existingProject.projectId}`, 
      existingProject );
  }

    deleteProject(existingProject:Project):Observable<boolean>
  {    
    return this.httpClient.delete<boolean>(`${environment.taskManagerMicroserviceUrl}${existingProject.projectId}` );
  }

  
    searchProject(searchBy:string,searchText:string):Observable<Project[]>
  {    
    return this.httpClient.get<Project[]>(`${environment.taskManagerMicroserviceUrl}seach/${searchBy}/${searchText}` );
  }
}
