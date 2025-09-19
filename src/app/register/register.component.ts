import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../models/register-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registerForm:FormGroup;
isRegisterSubmitted= false;

constructor(private accountService:AccountService, private router:Router)
{
   this.registerForm = new FormGroup(
    {
      userName: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      fullName: new FormControl(null,[Validators.required]),
      phoneNumber: new FormControl(null,[Validators.required]),
      password : new FormControl(null,[Validators.required]),
      confirmPassword
       : new FormControl(null,[Validators.required]),
    }
   );
}
   get register_userNameControl():any{
    return this.registerForm.controls["userName"];
   }

   get register_emailControl():any{
    return this.registerForm.controls["email"];
   }

   get register_fullNameControl():any{
    return this.registerForm.controls["fullName"];
   }
   get register_loginControl():any{
    return this.registerForm.controls["login"];
   }

    get register_passwordControl():any{
    return this.registerForm.controls["password"];
    }

    get register_confirmPassword_getControl():any{
    return this.registerForm.controls["confirmPassword"];
   }
  
   registerSubmitted()
   {
      this.isRegisterSubmitted=true;
      this.accountService.postRegister(this.registerForm.value).subscribe
      (
         {
           next :  (response:any) =>{
            console.log(response);
            this.isRegisterSubmitted=false;
             localStorage["token"] = response.token;
            this.router.navigate(['/dashboard']);
            this.registerForm.reset();         
         },
           error: (error:Error)=> { console.log(error)},
           
         }
      );     
      
   }

}
