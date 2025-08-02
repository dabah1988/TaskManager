import { Component,OnInit } from '@angular/core';
import { ProjectsService } from '../../Services/projects.service';
import { ManageProjectServiceService } from '../../Services/manage-project-service.service';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
 projects: Project[] = [];
  constructor(private myProjectService : ManageProjectServiceService) {


   }
  ngOnInit(): void {
        this.myProjectService.getAllProjects().subscribe({
      next: (projects) => 
        {
          this.projects = projects;
          console.log(this.projects); 
        },
      error: (err) => console.error('Erreur lors du chargement des projets', err)
    });
  }
 
 
}
