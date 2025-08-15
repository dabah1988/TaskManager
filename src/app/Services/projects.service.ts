import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { environment } from '../environment';
import { ProjectResponse } from '../models/project-response';
import { ProjectAddRequest } from '../models/project-add-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

   constructor(private httpClient:HttpClient) 
  { 

  }
  getAllProjects():Observable<Project[]>
  {
    return this.httpClient.get<Project[]>(environment.taskManagerMicroserviceUrl);
  } 

    addProject(newProject:ProjectAddRequest):Observable<ProjectResponse>
  {
    return this.httpClient.post<ProjectResponse>(environment.taskManagerMicroserviceUrl,{newProject});
  } 
}
