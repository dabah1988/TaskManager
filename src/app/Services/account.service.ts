import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { LoginUser } from '../models/login-user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

public currentUserName: string|null = null;
public currentUserEmail:string|null =null;
  constructor(private httpClient:HttpClient) { }

  public postRegister(postRegister:RegisterUser):Observable<RegisterUser>
  {
          return this.httpClient.post<RegisterUser>(`${environment.registrationMicroserviceUrl}register`,postRegister);
  }

   public getLogin(loginUser:LoginUser):Observable<LoginUser>
  {
          return this.httpClient.post<LoginUser>(`${environment.registrationMicroserviceUrl}login`,loginUser);
  }

  public getLogout ():Observable<any>
  {
          return this.httpClient.get(`${environment.registrationMicroserviceUrl}logout`);
  }
 
}