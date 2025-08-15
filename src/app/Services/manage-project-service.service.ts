
import { HttpClient } from '@angular/common/http';
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
  getAllProjects():Observable<Project[]>
  {
     return this.httpClient.get<Project[]>(environment.taskManagerMicroserviceUrl);  
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
}
