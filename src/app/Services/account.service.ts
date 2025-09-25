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
    this.loadUserFromStorage();
  }

public  getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}
  // Restaure la session côté client (appelé au démarrage et en fallback)
  loadUserFromStorage(): void {
    this.currentUserName = localStorage.getItem('currentUserName');
    this.currentUserEmail = localStorage.getItem('currentUserEmail');
  }
  public postRegister(postRegister:RegisterUser):Observable<any>
  {
          return this.httpClient.post<any>(`${environment.registrationMicroserviceUrl}register`,postRegister );
  }

   public postLogin(loginUser:LoginUser):Observable<any>
  {
          return this.httpClient.post<any>(`${environment.registrationMicroserviceUrl}login`,loginUser );
  }
    public postGenerateToken():Observable<any>
  {
      var token = localStorage["token"];
      var refreshToken = localStorage["refreshToken"];  
      return this.httpClient.post<any>(`${environment.registrationMicroserviceUrl}generate-new-jwt-token`, {token,refreshToken},{headers:this.getAuthHeaders()} );
  }
  

  public getLogout ():Observable<any>
  {
      // Supprimer seulement ce qui concerne l’utilisateur
  localStorage.removeItem('currentUserName');
  localStorage.removeItem('currentUserEmail');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');  
  this.currentUserName = null;
  this.currentUserEmail = null;
   return this.httpClient.get(`${environment.registrationMicroserviceUrl}logout`);
  }
 
}