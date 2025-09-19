import { HttpClient, HttpHeaders } from '@angular/common/http';
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
public myHeaders :  HttpHeaders
  constructor(private httpClient:HttpClient) { 
        this.myHeaders = new HttpHeaders()
    .set("Authorization", `Bearer ${localStorage.getItem('token')}`);
  }


  public postRegister(postRegister:RegisterUser):Observable<any>
  {
          return this.httpClient.post<any>(`${environment.registrationMicroserviceUrl}register`,postRegister, {headers:this.myHeaders} );
  }

   public postLogin(loginUser:LoginUser):Observable<any>
  {
          return this.httpClient.post<any>(`${environment.registrationMicroserviceUrl}login`,loginUser,{headers:this.myHeaders} );
  }

  public getLogout ():Observable<any>
  {
          return this.httpClient.get(`${environment.registrationMicroserviceUrl}logout`);
  }
 
}