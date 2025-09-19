import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { environment } from '../environment';
import { ProjectResponse } from '../models/project-response';
import { ProjectAddRequest } from '../models/project-add-request'
import { map } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
public myHeaders :  HttpHeaders
   constructor(private httpClient:HttpClient, public accountService:AccountService) 
  { 
      this.myHeaders = new HttpHeaders()
        .set("Authorization", `Bearer ${localStorage.getItem('token')}`);

  }
  getProjects(pageNumber: number, pageSize: number): Observable<Project[]> {
  const params = {
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString()
  };

  return this.httpClient.get<Project[]>(
    `${environment.taskManagerMicroserviceUrl}/projects`, 
    { params, headers:this.myHeaders}
  ).
  pipe(map(
(data:Project[]) =>
{
  for(let i=0;i<data.length;i++)
  {
      data[i].teamSize = data[i].teamSize*100;
  }
  return data;
}

  ));
}


    addProject(newProject:ProjectAddRequest):Observable<ProjectResponse>
  {
    return this.httpClient.post<ProjectResponse>(environment.taskManagerMicroserviceUrl,{newProject, headers:this.myHeaders });
  } 
}
