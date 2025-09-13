export class ProjectAddRequest {
    projectName: string = '';
   projectDescription: string = '';
   dateOfStart: string|null = ProjectAddRequest.todayDate(); // date du jour;
    teamSize: number = 1;

    static todayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // mois 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
