import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../Services/account.service';
import { LoginUser } from '../models/login-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
isloginSubmitted: boolean=false;
loginForm: FormGroup

constructor(private accountService: AccountService,private router:Router)
{
   this.loginForm = new FormGroup(
      {

        email: new FormControl(null,[Validators.required,Validators.email]),
        password : new FormControl(null,[Validators.required])
      }
     );
}

   get login_emailControl():any{
    return this.loginForm.controls["email"];
   }

     get login_passwordControl():any{
    return this.loginForm.controls["password"];
   }

     loginSubmitted()
     {
        this.isloginSubmitted=true;
        
        this.accountService.getLogin(this.loginForm.value).subscribe
        (
           {
             next :  (response:LoginUser) =>{
              console.log(response);
              this.isloginSubmitted=true;
              this.accountService.currentUserName = response.personName;
               this.accountService.currentUserEmail = response.email;

              this.router.navigate(['/dashboard']);
              this.loginForm.reset();         
           },
             error: (error:Error)=> { console.log(error)},
             
           }
        );     
        
     }

    
}
