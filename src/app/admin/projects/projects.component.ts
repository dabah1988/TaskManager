import { Component,NgModule,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManageProjectServiceService } from '../../Services/manage-project-service.service';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { ProjectAddRequest } from '../../models/project-add-request';
import { Utilitaire } from '../../models/utilitaire';
import { ProjectResponse } from '../../models/project-response';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
 projects: ProjectResponse[] = [];
 newProject: ProjectAddRequest = new ProjectAddRequest(); 
 editProject: Project= new Project();  
 editIndex:number=0;
 searchBy:string='';
 searchText:string='';  
 pageNumber:number=1;
 pageSize:number=25
 searchByOptions:string[]=[];


  constructor(private myProjectService : ManageProjectServiceService ) {

   }

  ngOnInit(): void {
       this.searchByOptions = Object.keys(new Project());
        this.searchBy = this.searchByOptions.find(opt => opt ==  'name') || '';
        this.myProjectService.getProjects(1,15).subscribe({
      next: (projects) => 
        {
          this.projects = projects;
          console.log(this.projects); 
        },
      error: (err) => console.error('Erreur lors du chargement des projets', err)
    });
  }
  onSaveClick() {    
    console.log(this.newProject);
    this.myProjectService.insertProject(this.newProject).subscribe({
      next: (myProjectResponse) => 
        {
          this.projects.unshift(myProjectResponse);
          console.log("project inserted : "+myProjectResponse); 
          // Reset all fields
          this.newProject = new ProjectAddRequest();
        },
      error: (err) =>
        {
              console.error('Error occured during insertion', err);
              alert("une erreur est survenue pendant l'insertion"+ {err});
        }
    });
  }
 onEditClick(event:Event,index:number) {
    this.editProject = this.projects[index];
    this.editIndex=index;
    this.editProject.dateOfStart = Utilitaire.convertoYYYY_MM_DD(this.editProject.dateOfStart);
 }
 onDeleteClick(event:Event,index:number) {
    this.editProject = this.projects[index];
    this.editIndex=index;

     // Demander confirmation avant de supprimer
  const confirmed = confirm(`Are you sure you want to delete "${this.editProject.projectName}" ?`);
  if (!confirmed) {
    return; // Sortir de la fonction si l'utilisateur annule
  }

     this.myProjectService.deleteProject(this.editProject).subscribe({
      next: (isDeleted) => 
        {
          if(isDeleted) this.projects.splice(index,1);
          else 
          {
            console.log("project not deleted"); 
            alert("project not deleted");
          }
        },
      error: (err) => console.error('Error occured during updation', err)
    });
 }
 

  onUpdateClick() {
    this.myProjectService.updateProject(this.editProject).subscribe({
      next: (myProjectUpdated) => 
        {
          console.log("project updated : "+myProjectUpdated); 
          this.projects[this.editIndex]=myProjectUpdated;
          // Reset all fields
          this.editProject = new Project();
        },
      error: (err) => console.error('Error occured during updation', err)
    });
 }

   onSearchClick() {
    this.myProjectService.searchProject(this.searchBy,this.searchText,this.pageNumber,this.pageSize).subscribe({
      next: (myprojetcs) => 
        {
          console.log("project found : "+myprojetcs); 
          this.projects = myprojetcs; 
        },
      error: (err) =>
        {
           console.error('Error occured during searching', err);
        } 
    });
 }


 formatDateForDisplay(dateStr: string | null): string|null {
    if (!dateStr) return '';
    return Utilitaire.convertoYYYYMDD(dateStr);
  }

  
}
