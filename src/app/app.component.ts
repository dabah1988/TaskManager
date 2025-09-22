import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AccountService } from './Services/account.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskManager';
  constructor(public accountService : AccountService,private router:Router )
  {

  }
 MyLogout()
  {
        this.accountService.getLogout().subscribe(
          {
           next : () => {
            this.accountService.currentUserName =null;
              this.router.navigate(['/login']);
           },
           error :()=>{}
          }
        );
   }

   RefreshClicked()
    {
      this.accountService.postGenerateToken().subscribe(
        {
        next: (response:any) => { console.log(response) },
        error: (error:Error) => { console.log(error) },
        }
      );
     }  
     
}
